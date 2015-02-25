var CircleSegment = function(x, y, radius, theta, direction) {
    'use strict';
    Object.apply(this, arguments);
    
    this.x = x || 0;
    this.y = y || 0;
    this.radius = radius || 0;
    this.theta = theta || 0;
    this.direction = direction || 0;
    return this;
};

CircleSegment.prototype = Object.create(Object.prototype);

CircleSegment.prototype.clone = function() {
    'use strict';
    return new CircleSegment(this.x, this.y, this.radius, this.theta, this.direction);
};
CircleSegment.prototype.arcFrom = function() {
    'use strict';
    return window.utils.wrap2P(this.direction - this.theta * 0.5);
};
CircleSegment.prototype.arcTo = function() {
    'use strict';
    return window.utils.wrap2P(this.direction + this.theta * 0.5);
};
CircleSegment.prototype.isNear = function(x, y) {
    'use strict';
    return near(x, y, this.x, this.y, this.radius);
};

CircleSegment.prototype.contains = function(x, y) {
'use strict';

    var fromAngle = this.arcFrom(),
    toAngle = this.arcTo(),
    angleToPoint = pointAngle(this.x, this.y, x, y);

    return fromAngle >= toAngle ?
        angleToPoint >= toAngle && angleToPoint <= fromAngle ?
        false :
        this.isNear(x, y) ?
        true :
        false :
        angleToPoint >= fromAngle && angleToPoint <= toAngle && this.isNear(x, y) ?
        true :
        false;
};

CircleSegment.prototype.draw = function(ictx) {
    'use strict';
    //console.log("csdraw");
    ictx.save();
    ictx.beginPath();
    ictx.moveTo(this.x, this.y);
    ictx.arc(this.x, this.y, this.radius, this.arcFrom(), this.arcTo());
    ictx.lineTo(this.x, this.y);
    ictx.closePath();
   // ictx.fillStyle = 'rgba(255,0,0,0.5)';
   // ictx.fill();
    ictx.stroke();
    ictx.restore();
};

CircleSegment.prototype.update = function(boid){
    'use strict';
    this.x = boid.location.x;
    this.y = boid.location.y;
    this.direction = boid.angle;
};