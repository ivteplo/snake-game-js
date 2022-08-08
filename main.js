// Copyright (c) 2018-2022 Ivan Teplov
window.onload = function () {
    var can = document.getElementById('snake'),
        c = can.getContext('2d'),
        d = null,
        a = null,
        s = null,
        grid = 30;
    newA(); newB(); canvasSizeSetup();
    
    window.resize = function () { canvasSizeSetup(); }
    
    addEventListener( 'keydown', function (e) {
        var k = e.keyCode;
        if ( [37, 38, 39, 40].indexOf(k) >= 0 ) e.preventDefault();
        if ( k == 37 && d !== 3 ) {d = 1}
        if ( k == 38 && d !== 4 ) {d = 2}
        if ( k == 39 && d !== 1 ) {d = 3}
        if ( k == 40 && d !== 2 ) {d = 4}
    } );
    
    setInterval(function() {
        c.clearRect(0, 0, can.width, can.height);
        c.fillStyle = '#c10000';
        c.fillRect(a[0], a[1], grid, grid);
        c.fillStyle = '#6a6a6a';
        
        s.forEach(function (el, i) {
            if ( el.x === s[s.length - 1].x && el.y === s[s.length - 1].y && i < s.length-1 ) {
                c.clearRect(0, 0, can.width, can.height); newA(); newB();
            }
            c.fillRect(el.x, el.y, grid, grid);
            if ( el.x > can.width && d == 3 ) el.x = 0;
            if ( el.x < 0 && d == 1 ) el.x = can.width;
            if ( el.y > can.height && d == 4 ) el.y = 0;
            if ( el.y < 0 && d == 2 ) el.y = can.height;
        });
        var m = s[0], f = {x: m.x, y: m.y}, l = s[s.length - 1], 
            move = null; c.fillStyle = '#4d4d4d'; 
        
        c.fillRect(l.x, l.y, grid, grid);
        if ( d !== null ) {
            if ( d == 3 ) f.x = l.x + grid, f.y = Math.floor( l.y / grid ) * grid, move = {x: l.x + grid * 2, y: l.y};

            if ( d == 1 ) f.x = l.x - grid, f.y = Math.floor( l.y / grid ) * grid, move = {x: l.x - grid * 2, y: l.y};

            if ( d == 2 ) f.y = l.y - grid, f.x = Math.floor( l.x / grid ) * grid, move = {x: l.x, y: l.y - grid * 2};

            if ( d == 4 ) f.y = l.y + grid, f.x = Math.floor( l.x / grid ) * grid, move = {x: l.x, y: l.y + grid * 2};

            s.push(f); s.splice(0, 1);
        }
        
        if ( s[s.length - 1].x == a[0] && s[s.length - 1].y == a[1] ) s.push(move), newA();
    }, 200);
    function getPos (min, max) {
        return ( 
            Math.floor((Math.random() * (max - min) + min) / grid) * grid 
        );
    }
    function newA () {
        a = [getPos(0, can.width), getPos(0, can.height)]
    }
    function newB () {
        var w = getPos(0, can.width),
            h = getPos(0, can.height);
        s = [{x: w, y: h}, {x: w + grid, y: h}];
    }
    function canvasSizeSetup (event) {
        can.width = Math.floor(document.documentElement.clientWidth / grid) * grid - grid;
        can.height = Math.floor(document.documentElement.clientHeight / grid) * grid - grid
    }
};
