'use strict';

var currentZIndex = 0;

function getRandomColor() {
    return randomColor({
        luminosity: 'bright',
        hue: 'random'
    });
}


class Cube {

    constructor(node, hashName) {
        this.hashName = hashName || '#reactamsterdam';
        this.size = 700;

        this.node = document.createElement('div');
        this.node.className = 'cube';
        this.container = node;
        this.container.appendChild(this.node);

        this.registerGetSet = this.registerGetSet.bind(this);

        this.createSides();

        this.initHashName('tw_text', hashName);
        this.initPhoto('userpic');
        this.initTweetText('tw_text');

    }

    initTweetText(side) {
        this.tweetText = document.createElement('p');
        this.tweetText.className = 'tweettext';
        this.getSide(side).appendChild(this.tweetText);
    }

    initPhoto(side) {
        this.photo = document.createElement('img');
        this.photo.className = 'photo';
        this.getSide(side).appendChild(this.photo);
    }

    initHashName(side, hashName) {
        this.hashNameNode = document.createElement('p');
        this.hashNameNode.className = 'hashname';
        this.hashNameNode.innerHTML = this.hashName;

        this.getSide(side).appendChild(this.hashNameNode);
    }

    getSide(sideName) {
        return this.node.getElementsByClassName(sideName)[0];
    }

    createSides() {
        var self = this;
        this.sides = {};
        this.sides.right = this.createElement('userpic');
        this.sides.front = this.createElement('tw_text');

        var zTransformString = 'translateZ(' + this._size / 2 + 'px)'

        Object.keys(this.sides).forEach(function (sideName) {
            self.sides[sideName].style.transform = self.sides[sideName].style.transform.replace('translateZ(250px)', zTransformString);
        })
    }

    createElement(className) {
        var result = document.createElement('div');
        result.className = className;
        this.node.appendChild(result);
        result.style.zIndex = currentZIndex++;
        return result;
    }


    registerGetSet(variableName) {
        function getterFunction() {
            return this['_' + variableName]
        }

        function setterFunction(value) {
            this['_' + variableName] = value;
        }


        if (Object.defineProperty) {
            Object.defineProperty(this, variableName, {
                get: getterFunction,
                set: setterFunction
            });
        }
        else if (document.__defineGetter__) {
            this.__defineGetter__(variableName, getterFunction);
            this.__defineSetter__(variableName, setterFunction);
        }

        this["get" + variableName] = getterFunction;
        this["set" + variableName] = setterFunction;
    }

    getJSON() {
        var self = this;
        var result = {};
        return JSON.stringify(result);
    }

    fromJSON(value) {
        var self = this;
        var transformObject = JSON.parse(value);
        Object.keys(transformObject).forEach(function (propertyName) {
            self[propertyName] = transformObject[propertyName];
        });
        self.node.setAttribute('data-x', self.x);
        self.node.setAttribute('data-y', self.y);
    }

    displayTweet(data) {
        var el = document.getElementById('author')
        if (el != undefined) {
            el.remove()
        }
        this.tweetText.innerHTML = data.text + '<div id="author">@' + data.author + '</div>';
        this.photo.src = data.image;
    }
}

window.Cube = Cube;