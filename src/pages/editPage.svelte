<script lang="ts">
    import { onMount } from "svelte";
    import { fabric } from "fabric";
    import { HsvPicker } from "svelte-color-picker";
    import Icon from "fa-svelte";
    import {
        faSquare,
        faCircle,
        faDownload,
        faUpload,
    } from "@fortawesome/free-solid-svg-icons";
    let canvas,
        activeObject,
        showUploadButton = false,
        showDownloadLinks = false;
    let fontFamilies = ["Arial", "serif", "cursive", "monospace"];
    let href;
    let object = {
        color: "black",
        strokeWidth: 1,
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
        activeObject = canvas;
        if (canvas.getActiveObject()) activeObject = canvas.getActiveObject();
    }
    function addLine() {
        let line = new fabric.Line([50, 50, 1000, 50], { stroke: "orange" });
        canvas.add(line);
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
    function saveAsPNG() {
        href = canvas.toDataURL({ format: "png" });
        this.download = "canvas.png";
    }
    function saveAsJPG() {
        href = canvas.toDataURL({ format: "jpeg" });
        this.download = "canvas.jpg";
    }
    function saveAsSVG() {
        let svgData = canvas.toSVG();
        let blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        href = URL.createObjectURL(blob);
        console.log(href);
        this.download = "canvas.svg";
    }
    function changeBorderColor() {
        activeObject.set("stroke", object.color);
        canvas.renderAll();
    }
    function uploadImage(e) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                var img = new fabric.Image(image);
                img.set({
                    left: 100,
                    top: 60,
                });
                img.scaleToWidth(200);
                canvas.add(img).setActiveObject(img).renderAll();
            };
        };
        reader.readAsDataURL(e.target.files[0]);
        showUploadButton = false;
    }
    function deleteObject() {
        if (activeObject == canvas) alert("No object is selected!");
        else canvas.remove(activeObject);
    }
    function handleColorChange(e) {
        object.color = `rgba(${e.detail.r},${e.detail.g},${e.detail.b},${e.detail.a})`;
        if (activeObject) updateObject();
    }
</script>

<section>
    <div class="toolbar">
        <div class="text" on:click={addText} on:keypress={addText}>
            <div class="icon">T</div>
            Text
        </div>
        <div class="line" on:click={addLine} on:keypress={addLine}>
            <div class="icon">
                <div class="line" />
            </div>
            <span class="text"> Line </span>
        </div>
        <div class="Rect" on:click={addRect} on:keypress={addRect}>
            <Icon icon={faSquare} class="icon" />
            Rectangle
        </div>
        <div class="Circle" on:click={addCircle} on:keypress={addCircle}>
            <Icon icon={faCircle} class="icon" />
            Circle
        </div>
        <div
            on:click={() => (showUploadButton = true)}
            on:keypress={() => (showUploadButton = true)}
        >
            {#if showUploadButton}
                <input
                    type="file"
                    accept="image/jpg image/png image/svg"
                    name="image"
                    on:change={uploadImage}
                />
            {:else}
                <Icon icon={faUpload} class="icon" />
                <label for="image"> Upload Image </label>
            {/if}
        </div>
        <div
            on:click={() => (showDownloadLinks = !showDownloadLinks)}
            on:keypress={() => (showDownloadLinks = !showDownloadLinks)}
        >
            {#if showDownloadLinks}
                <a {href} download="file" on:click={saveAsPNG}>
                    download as png
                </a>
                <a {href} download="file" on:click={saveAsJPG}>
                    download as jpg
                </a>
                <a {href} download="file" on:click={saveAsSVG}>
                    download as svg
                </a>
            {:else}
                <Icon icon={faDownload} class="icon" />
                Download
            {/if}
        </div>
    </div>
    <div
        class="canvas-container"
        on:click={updateSelection}
        on:keypress={updateSelection}
    >
        <canvas id="canvas" width="1050" height="600" />
    </div>
    <div class="props-pane">
        <button class="delete" on:click={deleteObject}>Delete object </button>
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
        <HsvPicker on:colorChange={handleColorChange} />
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
        left: 25vw;
    }
    .delete {
        background-color: red;
        font-weight: 300;
        font-size: 1.2rem;
    }
    .toolbar > div {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 8vh;
    }
    span.text {
        transform: translateY(-12px);
    }
    .line {
        position: relative;
        height: 2px;
        border-top: 2px solid white;
        top: 15px;
    }

    div :global(.icon) {
        font-size: 2rem;
        font-weight: 400;
        font-family: serif;
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
