const cursor = document.querySelector('.cursor');


//follow cursor on mouse

document.addEventListener('mousemove',(e) => {
    let x = e.pageX;
    let y = e.pageY;

    cursor.style.top = y + "px";
    cursor.style.left = x + "px";
    cursor.style.display = "block";

    // cursor effect on mose stopped
function mouseStopped(){
    cursor.style.display = "none";
}
timeout = setTimeout(mouseStopped,1000);
clearTimeOut(timeout);
});

// cursor effect on mouse

document.addEventListener('mouseout', ()=> {
    cursor.style.display = "none";
})
