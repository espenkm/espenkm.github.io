
var ids = 0;

function Player(name) {
    var self = this;

    this.started = false;
    this.id = ids++;
    this.name = name;
    this.sub = true;
    this.timerPlayed = 0;

    this.timeInPosition = new Tock({
        interval: 0,
        callback: function () {
            var currentLap = self.timeInPosition.lap()
            $('#current' + self.id).text(self.timeInPosition.msToTimecode(currentLap));

            if (!self.sub){
                $('#total' + self.id).text(self.timeInPosition.msToTimecode(currentLap + self.timerPlayed));
            }
        }
    });

    this.swap = function() {
        if (!this.sub && matchRunning){
            var currentLap = this.timeInPosition.lap();
            this.timerPlayed += currentLap; //;
        }

        this.sub = !this.sub;

        if (matchRunning){
            this.timeInPosition.stop();
            this.timeInPosition.start();
        }
    };

    this.start = function() {
        if (this.stared) {
            this.timeInPosition.pause();
        } else{
            this.timeInPosition.start();
        }

        this.stared = true;
    };

    this.stop = function() {
        this.timeInPosition.stop();
    };

    this.pause = function() {
        this.timeInPosition.pause();
    };
}


var players = [];
var matchRunning = false;
