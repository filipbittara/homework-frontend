<template>
  <span>Pick a color to draw</span>
    <div>
    <button v-for="(item, index) in colors" :key="index" @click="setColor(item)">
      <span :style="{color: item}">&#9632;</span>  
      {{capitalizeFirstLetter(item)}}
    </button>
  </div>
  <canvas id="drawing-board" width="560" height="360" @mousedown="beginDrawing" @mousemove="keepDrawing" @mouseup="stopDrawing" />
  <div>
    <button v-on:click="clear()">Clear the drawing board</button>
  </div>
</template>

<script>
import {Context} from 'svgcanvas'

export default {
  name: 'Canvas',
  data() {
    return {
      x: 0,
      y: 0,
      isDrawing: false,
      canvas: null,
      svgContext: null,
      strokeStyle: 'black',
      colors: ["red", "green", "blue", "yellow", "black"]
    }
  },
  methods: {
    drawLine(x1, y1, x2, y2, ctx) {
      ctx.beginPath();
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = 1;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
    },
    beginDrawing(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },
    keepDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY, this.canvas);
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY, this.svgContext);

        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },
    stopDrawing(e) {
      if (this.isDrawing === true) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY, this.canvas);
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY, this.svgContext);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
      }
      this.$emit('clicked', this.svgContext.getSerializedSvg())
    },
    clear() {
      this.canvas.clearRect(0, 0, 560, 360);
      this.svgContext = new Context(560, 360);
      this.$emit('clicked', this.svgContext.getSerializedSvg())
    },
    setColor(color) {
      this.strokeStyle = color;
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  },
  mounted() {
    var c = document.getElementById("drawing-board");
    this.canvas = c.getContext('2d');
    this.svgContext = new Context(560, 360);
  }
}
</script>

<style scoped>
  #drawing-board {
    border: 1px solid grey;
  }
</style>
