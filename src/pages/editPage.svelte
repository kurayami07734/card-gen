<script lang="ts">
    import { onMount } from "svelte";
    import { fabric } from "fabric";
    import { HsvPicker } from "svelte-color-picker";
    let canvas, activeObject;
    let fontFamilies = ["Arial", "serif", "cursive", "monospace"];
    let object = {
        color: "black",
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
    function save() {
        console.log(canvas.toSVG());
    }
    function addText() {
        let textBox = new fabric.Textbox("Hello There", {
            editable: true,
            left: 100,
            right: 100,
        });
        canvas.add(textBox);
    }
    function changeCanvasColor() {
        canvas.setBackgroundColor(object.color, canvas.renderAll.bind(canvas));
    }
    function updateSelection() {
        activeObject = canvas.getActiveObject();
        if (activeObject === null) activeObject = canvas;
    }
    function updateObject() {
        activeObject.set("fontSize", object.fontSize);
        activeObject.set("fontFamily", object.fontFamily);
        console.log(activeObject);
        activeObject.set("fill", object.color);
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
        <div class="Circle">Circle</div>
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
        <input
            type="number"
            bind:value={object.fontSize}
            on:change={updateObject}
        />
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
        <HsvPicker
            on:colorChange={(e) => {
                object.color = `rgba(${e.detail.r},${e.detail.g},${e.detail.b},${e.detail.a})`;
                if (activeObject !== undefined) updateObject();
            }}
        />
        <button on:click={changeCanvasColor}
            >Set this as canvas background
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
        justify-content: space-around;
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
    }
</style>
