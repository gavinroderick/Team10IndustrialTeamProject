    var Total = 2;
    //debug("meme");
    console.log("meme")
    var i;
    var j;
    var current = Math.random();
    var newNo = SmoothRandom(0.1,current);
    for (i = 0; i < Total; i++) 
    { 
        console.log("0900");
        for (j = 0; j < 10; j++)
        {
            console.log(newNo);
            current = newNo;
            newNo = SmoothRandom(0.2,current);
        }
    }

    function SmoothRandom(factor, start) 
    {
        var max = Math.min(1, start + factor);
        var min = Math.max(0, start - factor);
        return start = Math.random() * (max - min) + min;
    }


