const exampleBtn=document.querySelector('.ex-btn')
const sidebar=document.querySelector('.side-bar')

exampleBtn.addEventListener("click",function(){
    const overlay=document.querySelector('.overlay')
    console.log('example is ready');
    sidebar.style.translate="0"
    overlay.style.display="block"
    overlay.addEventListener("click",function(){
        overlay.style.display="none"
        sidebar.style.translate="100%"
    })
    
});