function SmoothRandom(factor, start) {
    var last = (start!==undefined)?start:Math.random();
    var halfEnvelope = (1/factor)/2;
    return function() {
        // clamp output range to [0,1] as Math.random()
        var max = Math.min(1, last + halfEnvelope);
        var min = Math.max(0, last - halfEnvelope);
        // return a number within halfRange of the last returned value
        return last = Math.random()*(max-min)+min;
    };
}