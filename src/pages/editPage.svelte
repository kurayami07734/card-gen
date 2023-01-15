<script lang="ts">
    import { onMount } from "svelte";
    import { fabric } from "fabric";
    import { HsvPicker } from "svelte-color-picker";
    let canvas, activeObject;
    let fontFamilies = ["Arial", "serif", "cursive", "monospace"];
    let object = {
        color: "black",
        strokeWidth: 5,
        stroke: "green",
        fontSize: 30,
        fontFamily: "Arial",
    };
    onMount(() => {
        canvas = new fabric.Canvas("canvas", {
            backgroundColor: "white",
            snapAngle: 0,
            fireRightClick: true,
        });
        activeObject = canvas;
    });
    function addRect() {
        let rect = new fabric.Rect({
            left: 150,
            top: 150,
            fill: "blue",
            width: 200,
            height: 200,
        });
        canvas.add(rect);
    }
    function addCircle() {
        let circle = new fabric.Circle({
            radius: 50,
            fill: "green",
            left: 100,
            right: 100,
        });
        canvas.add(circle);
    }

    function addText() {
        let textBox = new fabric.Textbox("Hello There", {
            editable: true,
            left: 100,
            top: 100,
        });
        canvas.add(textBox);
    }
    function changeCanvasColor() {
        canvas.setBackgroundColor(object.color, canvas.renderAll.bind(canvas));
    }
    function updateSelection() {
        activeObject = canvas.getActiveObject();
        if (activeObject === undefined || activeObject === null)
            activeObject = canvas;
        console.log(activeObject);
    }
    function updateObject() {
        activeObject.set("fontSize", object.fontSize);
        activeObject.set("fontFamily", object.fontFamily);
        activeObject.set("strokeWidth", object.strokeWidth);
        activeObject.set("stroke", object.stroke);
        console.log(activeObject);
        activeObject.set("fill", object.color);
        canvas.renderAll();
    }
    let href;
    function save() {
        href = canvas.toDataURL({ format: "png" });
        this.download = "canvas.png";
    }
    function changeBorderColor() {
        activeObject.set("stroke", object.color);
        canvas.renderAll();
    }
</script>

<section>
    <div class="toolbar">
        <div class="text" on:click={addText} on:keypress={addText}>Text</div>
        <div class="line">Line</div>
        <div class="Rect" on:click={addRect} on:keypress={addRect}>
            Rectangle
        </div>
        <div class="Circle" on:click={addCircle} on:keypress={addCircle}>
            Circle
        </div>
        <a {href} download="file" on:click={save}>download as png</a>
    </div>
    <div
        class="canvas-container"
        on:click={updateSelection}
        on:keypress={updateSelection}
    >
        <canvas id="canvas" width="1050" height="600" />
    </div>
    <div class="props-pane">
        <button on:click={() => canvas.remove(canvas.getActiveObject())}
            >Delete object
        </button>
        {#if activeObject && activeObject.type === "textbox"}
            <div class="font-size-picker">
                <label for="number">Font Size</label>
                <input
                    type="number"
                    bind:value={object.fontSize}
                    on:change={updateObject}
                />
            </div>
            <div class="font-family-picker">
                <label for="select">Font Face</label>
                <select
                    name="fontFamily"
                    id="font-family"
                    bind:value={object.fontFamily}
                    on:change={updateObject}
                >
                    {#each fontFamilies as font}
                        <option value={font}>{font}</option>
                    {/each}
                </select>
            </div>
        {/if}
        <div class="border-width-picker">
            <label for="number">Border width</label>
            <input
                type="number"
                bind:value={object.strokeWidth}
                on:change={updateObject}
            />
        </div>
        <HsvPicker
            on:colorChange={(e) => {
                object.color = `rgba(${e.detail.r},${e.detail.g},${e.detail.b},${e.detail.a})`;
                if (activeObject) updateObject();
            }}
        />
        <button on:click={changeBorderColor}
            >Set this color as border color
        </button>
        <button on:click={changeCanvasColor}
            >Set this color as canvas background
        </button>
    </div>
</section>

<style>
    section {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 92vh;
    }
    #canvas {
        background-color: white;
        border-radius: 5px;
    }
    .toolbar {
        position: absolute;
        display: flex;
        flex-direction: row;
        width: 80vw;
        gap: 2rem;
        top: 10vh;
        left: 10vh;
    }
    .toolbar > div {
        cursor: pointer;
    }
    .props-pane {
        display: flex;
        height: 90vh;
        justify-content: center;
        gap: 2rem;
        flex-direction: column;
        align-items: center;
        font-size: 1.1rem;
    }
    .props-pane input {
        width: 4rem;
        font-size: 1.1rem;
    }
    .props-pane select {
        font-size: 1.2rem;
    }
</style>
