(function() {

    // Matter aliases
    var Engine = Matter.Engine,
        Gui = Matter.Gui,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint;

    var Bomb = {};

    var _engine,
        _sceneName = 'mixed',
        _sceneWidth,
        _sceneHeight;

    Bomb.init = function() {
        var canvasContainer = document.getElementById('canvas-container'),
            bombStart = document.getElementById('bomb-start');
        
        bombStart.addEventListener('click', function() {
            bombStart.style.display = 'none';
        
            _engine = Engine.create(canvasContainer, {
                render: {
                    options: {
                        wireframes: false, // true
                        showAngleIndicator: false, // true
                        showDebug: false // true
                    }
                }
            });

            Bomb.fullscreen();

            setTimeout(function() {
                Engine.run(_engine);
                Bomb.updateScene();
            }, 800);
        });
        
        window.addEventListener('deviceorientation', Bomb.updateGravity, true);
        window.addEventListener('touchstart', Bomb.fullscreen);
        window.addEventListener('orientationchange', function() {
            Bomb.updateGravity();
            Bomb.updateScene();
            Bomb.fullscreen();
        }, false);
    };

    window.addEventListener('load', Bomb.init);

    Bomb.mixed = function() {
        var _world = _engine.world;
        
        Bomb.reset();

        World.add(_world, MouseConstraint.create(_engine));

        // Add a bomb
        function addBomb() {
            var bombDropPosition = _sceneWidth * Math.random();
            var bomb = Bodies.circle (bombDropPosition, 20, 60, {
                friction: 0.01,
                restitution: 0.9,
                render: {
                    strokeStyle: '#777'
                    // sprite: {
                    //     texture: 'http://images.neopets.com/items/pteri_bomb.gif' // TODO: Get the bomb texture from JonD
                    // }
                }
            }, 40)
            World.add(_world, bomb);
        };
        // World.add(_world, bomb);

        // Expose the bomb creation for sockets to use
        window.addBomb = addBomb;
    };
    
    Bomb.updateScene = function() {
        if (!_engine)
            return;
        
        _sceneWidth = document.documentElement.clientWidth;
        _sceneHeight = document.documentElement.clientHeight;

        var boundsMax = _engine.world.bounds.max,
            renderOptions = _engine.render.options,
            canvas = _engine.render.canvas;

        boundsMax.x = _sceneWidth;
        boundsMax.y = _sceneHeight;

        canvas.width = renderOptions.width = _sceneWidth;
        canvas.height = renderOptions.height = _sceneHeight;

        Bomb[_sceneName]();
    };
    
    Bomb.updateGravity = function () {
        if (!_engine)
            return;
        
        var orientation = window.orientation,
            gravity = _engine.world.gravity;

        if (orientation === 0) {
            gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
            gravity.y = Common.clamp(event.beta, -90, 90) / 90;
        } else if (orientation === 180) {
            gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
            gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
        } else if (orientation === 90) {
            gravity.x = Common.clamp(event.beta, -90, 90) / 90;
            gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
        } else if (orientation === -90) {
            gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
            gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
        }
    };
    
    Bomb.fullscreen = function(){
        var _fullscreenElement = _engine.render.canvas;
        
        if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
            if (_fullscreenElement.requestFullscreen) {
                _fullscreenElement.requestFullscreen();
            } else if (_fullscreenElement.mozRequestFullScreen) {
                _fullscreenElement.mozRequestFullScreen();
            } else if (_fullscreenElement.webkitRequestFullscreen) {
                _fullscreenElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        }
    };
    
    Bomb.reset = function() {
        var _world = _engine.world;

        Common._seed = 2;
        
        World.clear(_world);
        Engine.clear(_engine);
        
        var offset = 5;

        // The boundaries
        World.addBody(_world, Bodies.rectangle(_sceneWidth * 0.5, -offset, _sceneWidth + 0.5, 50.5, { isStatic: true }));  // Top
        World.addBody(_world, Bodies.rectangle(_sceneWidth * 0.5, _sceneHeight + offset, _sceneWidth + 0.5, 50.5, { isStatic: true }));
        World.addBody(_world, Bodies.rectangle(_sceneWidth + offset, _sceneHeight * 0.5, 50.5, _sceneHeight + 0.5, { isStatic: true }));
        World.addBody(_world, Bodies.rectangle(-offset, _sceneHeight * 0.5, 50.5, _sceneHeight + 0.5, { isStatic: true }));
    };
})();