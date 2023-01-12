<script lang="ts">
    import { onMount } from "svelte";
    import { fabric } from "fabric";
    let canvas;
    let canvasColor = "white";
    let activeObject;
    onMount(() => {
        canvas = new fabric.Canvas("canvas", {
            backgroundColor: canvasColor,
            snapAngle: 0,
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
        canvas.setBackgroundColor(canvasColor, canvas.renderAll.bind(canvas));
    }
</script>

<section>
    <div class="toolbar">
        <div class="text" on:click={addText} on:keypress={addText}>Text</div>
        <div class="line">Line</div>
        <div class="Rect">Rectangle</div>
    </div>
    <div class="canvas-container">
        <canvas id="canvas" width="1050" height="600" />
    </div>
    <div class="props-pane">
        <p>Propeties</p>
    </div>
</section>

<style>
    section {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 92vh;
    }
    #canvas {
        background-color: white;
        border-radius: 4px;
        /* margin: 1rem 2rem; */
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
</style>
