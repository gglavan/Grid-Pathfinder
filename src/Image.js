export function image() {
    const img = new Image();
    img.src = 'testImg.png';
    img.onload = () => {
        draw(img);
    };
}
function draw(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.display = 'none';
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const h = imageData.height;  
    const w = imageData.width;
    let counter = 0;
    let a = [];
    let b = [];
    let l = 0;

        for(let i = 0; i < data.length; i += 4) {
            a.push({"r" : data[i], "g" : data[i + 1], "b" : data[i + 2], "a" : data[i + 3]});
            l++;
            if(l == w) {
                b.push(a);
                a = [];
                l = 0;
            }
        }
        let str = "";
        for(let i = 0; i < h - 20 + 1; i += 20) {
            for(let j = 0; j < w - 20 +1; j += 20) {
                let res = 0;
                for(let n = i; n < i + 20; n++) {
                    for(let m = j; m < j + 20; m++) {
                        if(b[n][m].r == 0 && b[n][m].g == 0 && b[n][m].b == 0) {
                            res++;
                        }
                    }
                }
                if(res > 200) {
                    str += "1"
                } else str += "0";
            }
            str += '\n';
        }
    console.log(str);   
}
