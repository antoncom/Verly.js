class Point {
  constructor(x, y, vx, vy, radius) {
    this.pos = new Vector(x, y);
    this.oldpos = new Vector(x + (vx || 0), y + (vy || 0));
    this.bounce = 0.99;
    this.friction = 0.99;
    this.groundFriction = 0.8;
    this.gravity = new Vector(0, 1);
    this.pinned = false;
    this.radius = radius || 5;
    this.color = '#e62a4f';
  }

  setRadius(radius) {
    this.radius = radius;
  }
  pin() {
    this.pinned = true;
  }

  constrain() {
    // if (this.pos.y > height - 1) {
    //   this.pos.y = height - 1;
    // }
    // if (this.pos.x < 0) {
    //   this.pos.x = 0;
    // }
    // if (this.pos.x > width - 1) {
    //   this.pos.x = width - 1;
    // }
    let vel = Vector.sub(this.pos, this.oldpos);
    vel.mult(this.friction);

    if (this.pos.x > width-this.radius) {
      this.pos.x = width-this.radius;
      this.oldpos.x = (this.pos.x + vel.x) * this.bounce;
    } else if (this.pos.x < this.radius) {
      this.pos.x = this.radius;
      this.oldpos.x = (this.pos.x + vel.x) * this.bounce;
    }
    if (this.pos.y > height-this.radius) {
      this.pos.y = height-this.radius;
      this.oldpos.y = (this.pos.y + vel.y) * this.bounce;
    } else if (this.pos.y < this.radius) {
      this.pos.y = this.radius;
      this.oldpos.y = (this.pos.y + vel.y) * this.bounce;
    }
  };

  update() {
    if (this.pinned) return;
    let vel = Vector.sub(this.pos, this.oldpos);
    vel.mult(this.friction);
    // if the point touches the ground set groundFriction
    if (this.pos.y >= height - this.radius && vel.magSq() > 0.000001) {
      var m = vel.mag();
      vel.x /= m;
      vel.y /= m;
      vel.mult(m * this.groundFriction);
    }
    this.oldpos.setXY(this.pos.x, this.pos.y);
    this.pos.add(vel);
    this.pos.add(this.gravity);
  }

  render() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}