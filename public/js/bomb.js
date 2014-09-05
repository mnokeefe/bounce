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
        MouseConstraint = Matter.MouseConstraint,
        Events = Matter.Events;

    var Bomb = {};

    var _engine,
        _sceneName = 'game',
        _sceneWidth,
        _sceneHeight,
        bounces;

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

    // START THE MEAT OF IT ////////////////////////////////////////////////////
    Bomb.game = function() {
        var _world = _engine.world;
        Bomb.reset();
        World.add(_world, MouseConstraint.create(_engine));

        // Add a bomb
        function addBomb() {
            var bombDropPosition = _sceneWidth * Math.random();
            var bomb = Bodies.circle(bombDropPosition, 50, 60, {
                    friction: 0.01,
                    restitution: 0.9
            }, 40)
            bounces = 0; // reset the bounce count
            World.addBody(_world, bomb);
            window.bomb = bomb; // expose it
        };
        window.addBomb = addBomb; // Expose the bomb creation for sockets to use

        Events.on(_engine, 'collisionStart', function(event) {
            var pairs = event.pairs;

            // Detect game events
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i];

                // If bomb hits the roof
                if (pair.bodyA.groupId == 1) {
                    Composite.removeBody(_world, pair.bodyB);
                    console.log('roof collision');
                // Or if it hits the floor increase the bounce count
                } else if (pair.bodyA.groupId == 2) {
                    bounces = bounces + 1;
                }

                // Bounced three times
                if (bounces > 3) {
                    console.log('explode!')
                    Composite.removeBody(_world, pair.bodyB);
                }
            }
        });
    };
    // END /////////////////////////////////////////////////////////////////////

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

        // Roof
        World.addBody(_world, Bodies.rectangle(_sceneWidth * 0.5, -200, _sceneWidth + 0.5, 20.5, { 
            density: 0,
            groupId: 1, // Sky group
            isStatic: true,
            render: { 
                fillStyle: '#edc51e', 
                strokeStyle: '#b5a91c' 
            } 
        }));
        // Floor
        // id = 4
        World.addBody(_world, Bodies.rectangle(_sceneWidth * 0.5, _sceneHeight + offset, _sceneWidth + 0.5, 50.5, {
            groupId: 2, // Floor group
            isStatic: true
        }));
        // Walls
        // Left wall id = 6
        World.addBody(_world, Bodies.rectangle(_sceneWidth + offset, _sceneHeight * 0.5, 50.5, _sceneHeight + 200.5, { isStatic: true }));
        World.addBody(_world, Bodies.rectangle(-offset, _sceneHeight * 0.5, 50.5, _sceneHeight + 200.5, { isStatic: true }));
    };
})();