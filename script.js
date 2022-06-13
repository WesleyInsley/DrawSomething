window.addEventListener('load', () => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext('2d');

    //resizing our canvas
    canvas.height = window.innerHeight / 1.5;
    canvas.width = window.innerWidth / 1.5;
    
    //some initial variables variables
    let painting = false;
    let clearCanvas = document.querySelector("#clear-canvas");


    //star/finish functions
    function startPosition(e){
        painting = true;
        draw(e);
    }

    function finishedPosition(){
        painting = false;
        context.beginPath();
    }


    //brush-size slider
    let brushSizeSlider = document.getElementById('brush-range');
    let brushSizeIndicator = document.querySelector("#brush-size");
    let brushSize = brushSizeSlider.value;

    brushSizeIndicator.innerHTML = brushSize;

    brushSizeSlider.addEventListener('change', () => {
        console.log(brushSizeSlider.value);
        brushSize = brushSizeSlider.value;
        brushSizeIndicator.innerHTML = brushSize;
    })

    //changing color of brush
    let brushColor = "#000000";
    let colorPicker = document.getElementById('color-picker');
    
    colorPicker.addEventListener('change', function () {
        brushColor = this.value;
    })  


    function draw(e){
        if(!painting) return;
        context.lineWidth = brushSize;
        context.lineCap = 'round';
        context.strokeStyle = brushColor;
        context.lineTo(e.layerX - (this.offsetLeft + 15), e.layerY - (this.offsetTop + 15));
        context.stroke();
        context.beginPath();
        context.moveTo(e.layerX - (this.offsetLeft + 15), e.layerY - (this.offsetTop + 15));
    }

    //eventListeners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    
    //button event Listeners
    //--clear the canvas
    clearCanvas.addEventListener('click', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
    })

    

})
