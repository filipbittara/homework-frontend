<template>
  <canvas id="myCanvas" width="560" height="360" @mousedown="beginDrawing" @mousemove="keepDrawing" @mouseup="stopDrawing" />
  <div>
    <button @click="setColor('red')">Red</button>
    <button @click="setColor('blue')">Blue</button>
    <button @click="setColor('black')">Black</button>
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
      strokeStyle: 'black'
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
    setColor(color) {
      this.strokeStyle = color;
    }
  },
  mounted() {
    var c = document.getElementById("myCanvas");
    this.canvas = c.getContext('2d');
    this.svgContext = new Context(560, 360);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #myCanvas {
    border: 1px solid grey;
  }
</style>
