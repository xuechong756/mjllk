require = function a(s, c, l) {
    function r(e, t) {
        if (!c[e]) {
            if (!s[e]) {
                var i = "function" == typeof require && require;
                if (!t && i)
                    return i(e, !0);
                if (h)
                    return h(e, !0);
                var n = new Error("Cannot find module '" + e + "'");
                throw n.code = "MODULE_NOT_FOUND",
                n
            }
            var o = c[e] = {
                exports: {}
            };
            s[e][0].call(o.exports, function(t) {
                return r(s[e][1][t] || t)
            }, o, o.exports, a, s, c, l)
        }
        return c[e].exports
    }
    for (var h = "function" == typeof require && require, t = 0; t < l.length; t++)
        r(l[t]);
    return r
}({
    AnimFunc: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "069bcLwjtNB/LYJrOEJbxa+", "AnimFunc"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            shake: function() {
                cc.log("helpBtnShake");
                var t = cc.rotateTo(.1, 15)
                  , e = cc.rotateTo(.1, 0)
                  , i = cc.rotateTo(.1, -15)
                  , n = cc.rotateTo(.12, 0)
                  , o = cc.repeat(cc.sequence(t, e, i, n), 3);
                this.node.stopAllActions(),
                this.node.runAction(o)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    BeginView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "961c4S3IrNHB4M+zHyOMk6f", "BeginView"),
        cc.Class({
            extends: cc.Component,
            properties: {
                gameApplication: {
                    default: null,
                    type: Object
                },
                musicSprite: {
                    default: null,
                    type: cc.Node
                },
                shine: {
                    default: [],
                    type: [cc.Node]
                },
                worldBtn: {
                    default: null,
                    type: cc.Node
                },
                friendBtn: {
                    default: null,
                    type: cc.Node
                },
                worldList: {
                    default: null,
                    type: cc.Node
                },
                friendList: {
                    default: null,
                    type: cc.Node
                },
                worldContent: {
                    default: null,
                    type: cc.Node
                },
                friendContent: {
                    default: null,
                    type: cc.Node
                },
                headSpriteList: {
                    default: {},
                    visible: !1
                },
                worldPlayer: {
                    default: [],
                    visible: !1
                },
                friendPlayer: {
                    default: [],
                    visible: !1
                },
                worldUIPlayer: {
                    default: [],
                    visible: !1
                },
                friendUIPlayer: {
                    default: [],
                    visible: !1
                },
                prefab_player: {
                    default: null,
                    type: cc.Prefab
                }
            },
            onEnable: function() {
                this.LoadRank(),
                window.timeGiftScript.giftBtn.y = .5 * cc.winSize.height - 80,
                window.timeGiftScript.giftBtn.x = .5 * cc.winSize.width - 100,
                window.timeGiftScript.giftBtn.active = !1,
                gameApplication.popGameView.active = !0
            },
            onDisable: function() {
                gameApplication.popGameView.active = !1
            },
            onLoad: function() {
                window.gameApplication.soundManager.isOpen ? this.musicSprite.active = !1 : this.musicSprite.active = !0;
                for (var t = 0; t < 3; t += 1)
                    this.shineAnim(t)
            },
            shineAnim: function(t) {
                this.scheduleOnce(function() {
                    this.shine[t].active = !0
                }
                .bind(this), 1.1 + .3 * t)
            },
            start: function() {
                this.LoadRank()
            },
            onBtnClicked: function(t, e) {
                window.gameApplication.soundManager.playSound("btn_click"),
                "Play" == e ? window.gameApplication.openMainView(!0) : "Music" == e ? window.gameApplication.soundManager.isOpen ? (window.gameApplication.soundManager.setIsOpen(!1),
                this.musicSprite.active = !0) : (window.gameApplication.soundManager.setIsOpen(!0),
                this.musicSprite.active = !1) : "Sign" == e ? window.gameApplication.openMissionView(!0) : "Gift" == e ? window.gameApplication.onGiftBtnClick(function(t) {
                    t && (window.gameApplication.soundManager.playSound("tip"),
                    SDK().getItem("tips", function(t) {
                        t += 1,
                        SDK().setItem({
                            tips: t
                        }, null),
                        window.gameApplication.flyTipAnim()
                    }
                    .bind(this)))
                }
                .bind(this)) : "Share" == e ? SDK().getItem("all", function(t) {
                    window.gameApplication.onShareBtnClick(t)
                }
                .bind(this)) : "WorldRank" == e ? (this.GetWorldRank(this.worldPlayer),
                this.worldList.active = !0,
                this.worldBtn.active = !0,
                this.friendList.active = !1,
                this.friendBtn.active = !1) : "FriendRank" == e && (this.GetFriendRank(this.friendPlayer),
                this.worldList.active = !1,
                this.worldBtn.active = !1,
                this.friendList.active = !0,
                this.friendBtn.active = !0)
            },
            update: function(t) {},
            LoadRank: function() {
                SDK().getFriendsInfo(function(t) {
                    this.GetFriendRank(t)
                }
                .bind(this)),
                SDK().getRank(2, 20, 0, function(t) {
                    this.GetWorldRank(t)
                }
                .bind(this))
            },
            GetFriendRank: function(t) {
                var i = this;
                this.friendPlayer = t;
                for (var e = function() {
                    n >= i.friendUIPlayer.length ? (o = cc.instantiate(i.prefab_player),
                    a = o.getChildByName("Mask").getChildByName("Head").getComponent(cc.Sprite),
                    s = o.getChildByName("Name").getComponent(cc.Label),
                    c = o.getChildByName("No"),
                    l = o.getChildByName("Num"),
                    c.active = !1,
                    l.active = !1,
                    i.friendUIPlayer[n] = {},
                    i.friendUIPlayer[n].playerBar = o,
                    i.friendUIPlayer[n].Head = a,
                    i.friendUIPlayer[n].Name = s) : (o = i.friendUIPlayer[n].playerBar,
                    a = i.friendUIPlayer[n].Head,
                    s = i.friendUIPlayer[n].Name),
                    r = o.getChildByName("Play"),
                    s.node.active = !0,
                    o.name = i.friendPlayer[n].id;
                    var e = (h = i).friendPlayer[n].id;
                    r.off(cc.Node.EventType.TOUCH_END),
                    r.on(cc.Node.EventType.TOUCH_END, function(t) {
                        window.gameApplication.soundManager.playSound("btn_click"),
                        SDK().playWith(e, h.highestScore, function(t) {
                            window.gameApplication.openMainView(!0)
                        }
                        .bind(this))
                    }, i),
                    s.string = i.friendPlayer[n].name,
                    o.parent = i.friendContent,
                    i.LoadSprite(i.friendPlayer[n].headUrl, a, i.headSpriteList[i.friendPlayer[n].id])
                }, n = 0; n < this.friendPlayer.length; n += 1) {
                    var o, a, s, c, l, r, h;
                    e()
                }
                if (this.friendPlayer.length < this.friendUIPlayer.length)
                    for (n = this.friendPlayer.length; n < this.friendUIPlayer.length; n += 1)
                        this.friendUIPlayer[n].playerBar.active = !1
            },
            GetWorldRank: function(t) {
                this.worldPlayer = t;
                for (var e = !1, i = 0; i < this.worldPlayer.length; i += 1)
                    this.LoadRankData(i, this.worldPlayer[i]) && (e = !0);
                var n = this.worldPlayer.length;
                if (e || (n += 1,
                SDK().getRankScore(2, function(t) {
                    null != t && this.LoadRankData(n - 1, t)
                }
                .bind(this))),
                n < this.worldUIPlayer.length)
                    for (i = this.worldPlayer.length; i < this.worldUIPlayer.length; i += 1)
                        this.worldUIPlayer[i].playerBar.active = !1
            },
            LoadRankData: function(t, e) {
                var i, n, o, a, s, c = !1;
                t >= this.worldUIPlayer.length ? (n = (i = cc.instantiate(this.prefab_player)).getComponent(cc.Sprite),
                o = i.getChildByName("No").getComponent(cc.Label),
                a = i.getChildByName("Num").getComponent(cc.Label),
                s = i.getChildByName("Mask").getChildByName("Head").getComponent(cc.Sprite),
                i.getChildByName("Name").active = !1,
                this.worldUIPlayer[t] = {},
                this.worldUIPlayer[t].playerBar = i,
                this.worldUIPlayer[t].mainBg = n,
                this.worldUIPlayer[t].No = o,
                this.worldUIPlayer[t].Score = a,
                this.worldUIPlayer[t].Head = s) : (i = this.worldUIPlayer[t].playerBar,
                n = this.worldUIPlayer[t].mainBg,
                o = this.worldUIPlayer[t].No,
                a = this.worldUIPlayer[t].Score,
                s = this.worldUIPlayer[t].Head);
                return o.node.active = !0,
                a.node.active = !0,
                i.name = e.id,
                i.parent = this.worldContent,
                e.id == SDK().getSelfInfo().id && (c = !0),
                i.getChildByName("Play").active = !1,
                o.string = "No:" + e.no,
                a.string = e.score,
                this.LoadSprite(e.headUrl, s, this.headSpriteList[e.id]),
                c
            },
            LoadSprite: function(t, i, n) {
                null == n ? cc.loader.load(t, function(t, e) {
                    n = new cc.SpriteFrame(e),
                    i.spriteFrame = n
                }) : i.spriteFrame = n
            }
        }),
        cc._RF.pop()
    }
    , {}],
    ClickPoint: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "52255lSTMZBOpxqFLE3ziZK", "ClickPoint"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                cc.director.getCollisionManager().enabled = !0,
                this.node.parent.on(cc.Node.EventType.TOUCH_START, function(t) {
                    this.onMouseDown(t)
                }, this),
                this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, function(t) {
                    this.onMouseMove(t)
                }, this),
                this.node.parent.on(cc.Node.EventType.TOUCH_END, function(t) {
                    this.onMouseUp(t)
                }, this),
                this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, function(t) {
                    this.onMouseUp(t)
                }, this),
                this.node.active = !1
            },
            onMouseDown: function(t) {
                this.isTouching = !0,
                this.clickTime = 0,
                this.touchPos = this.node.parent.convertToNodeSpaceAR(t.getLocation()),
                this.node.position = this.touchPos,
                this.node.active = !0,
                this.node.emit("moveClick", {
                    pos: this.touchPos
                })
            },
            onMouseMove: function(t) {
                this.isTouching && (this.touchPos = this.node.parent.convertToNodeSpaceAR(t.getLocation()),
                this.node.position = this.touchPos,
                this.node.emit("moveClick", {
                    pos: this.touchPos
                }))
            },
            onMouseUp: function(t) {
                this.isTouching = !1,
                this.clickTime,
                this.node.active = !1,
                this.node.emit("clickEnd", {})
            },
            onCollisionEnter: function(t, e) {
                this.node.emit("collision", {
                    other: t
                })
            },
            onCollisionStay: function(t, e) {},
            onCollisionExit: function(t, e) {},
            start: function() {}
        }),
        cc._RF.pop()
    }
    , {}],
    1: [function(t, e, i) {
        var n = [].indexOf;
        e.exports = function(t, e) {
            if (n)
                return t.indexOf(e);
            for (var i = 0; i < t.length; ++i)
                if (t[i] === e)
                    return i;
            return -1
        }
    }
    , {}],
    2: [function(require, module, exports) {
        var indexOf = require("indexof")
          , Object_keys = function(t) {
            if (Object.keys)
                return Object.keys(t);
            var e = [];
            for (var i in t)
                e.push(i);
            return e
        }
          , forEach = function(t, e) {
            if (t.forEach)
                return t.forEach(e);
            for (var i = 0; i < t.length; i++)
                e(t[i], i, t)
        }
          , defineProp = function() {
            try {
                return Object.defineProperty({}, "_", {}),
                function(t, e, i) {
                    Object.defineProperty(t, e, {
                        writable: !0,
                        enumerable: !1,
                        configurable: !0,
                        value: i
                    })
                }
            } catch (t) {
                return function(t, e, i) {
                    t[e] = i
                }
            }
        }()
          , globals = ["Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape"];
        function Context() {}
        Context.prototype = {};
        var Script = exports.Script = function(t) {
            if (!(this instanceof Script))
                return new Script(t);
            this.code = t
        }
        ;
        Script.prototype.runInContext = function(e) {
            if (!(e instanceof Context))
                throw new TypeError("needs a 'context' argument.");
            var t = document.createElement("iframe");
            t.style || (t.style = {}),
            t.style.display = "none",
            document.body.appendChild(t);
            var i = t.contentWindow
              , n = i.eval
              , o = i.execScript;
            !n && o && (o.call(i, "null"),
            n = i.eval),
            forEach(Object_keys(e), function(t) {
                i[t] = e[t]
            }),
            forEach(globals, function(t) {
                e[t] && (i[t] = e[t])
            });
            var a = Object_keys(i)
              , s = n.call(i, this.code);
            return forEach(Object_keys(i), function(t) {
                (t in e || -1 === indexOf(a, t)) && (e[t] = i[t])
            }),
            forEach(globals, function(t) {
                t in e || defineProp(e, t, i[t])
            }),
            document.body.removeChild(t),
            s
        }
        ,
        Script.prototype.runInThisContext = function() {
            return eval(this.code)
        }
        ,
        Script.prototype.runInNewContext = function(e) {
            var i = Script.createContext(e)
              , t = this.runInContext(i);
            return forEach(Object_keys(i), function(t) {
                e[t] = i[t]
            }),
            t
        }
        ,
        forEach(Object_keys(Script.prototype), function(i) {
            exports[i] = Script[i] = function(t) {
                var e = Script(t);
                return e[i].apply(e, [].slice.call(arguments, 1))
            }
        }),
        exports.createScript = function(t) {
            return exports.Script(t)
        }
        ,
        exports.createContext = Script.createContext = function(e) {
            var i = new Context;
            return "object" == typeof e && forEach(Object_keys(e), function(t) {
                i[t] = e[t]
            }),
            i
        }
    }
    , {
        indexof: 1
    }],
    DailyView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e2046NSafFEN7tYxw+0HI+z", "DailyView"),
        cc.Class({
            extends: cc.Component,
            properties: {
                curYear: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                curMonth: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                curDay: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                challengeDay: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                maxDay: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                firstDay: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                challengeIdx: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                medalVal: {
                    default: [],
                    type: [cc.Node]
                },
                missionVal: {
                    default: [],
                    type: [cc.Float],
                    visible: !1
                },
                titleMonth: {
                    default: null,
                    type: cc.Label
                },
                titleDay: {
                    default: null,
                    type: cc.Label
                },
                tipsSprite: {
                    default: null,
                    type: cc.Node
                },
                tipsSprite1: {
                    default: null,
                    type: cc.Node
                },
                progress: {
                    default: null,
                    type: cc.ProgressBar
                },
                content: {
                    default: null,
                    type: cc.Node
                },
                winCrown: {
                    default: null,
                    type: cc.Node
                },
                uiList: {
                    default: [],
                    visible: !1
                },
                item: {
                    default: null,
                    type: cc.Node
                },
                uiViewAtlas: {
                    default: null,
                    type: cc.SpriteAtlas
                }
            },
            onEnable: function() {
                this.node.setLocalZOrder(1500),
                this.tipsSprite.active = !0,
                this.tipsSprite1.active = !0,
                this.checkReSet(),
                this.reFresh(),
                window.isPlaying ? (window.isPlaying = !1,
                window.isPoP = !0) : window.isChallenge && (window.isPoP = !1,
                window.isChallenge = !1,
                window.isWin && (SDK().getItem("challenge" + this.challengeDay, function(t) {
                    if (1 != t) {
                        var e = {};
                        e["challenge" + this.challengeDay] = 1,
                        SDK().setItem(e),
                        SDK().getItem("winCount", function(t) {
                            t += 1,
                            this.progress.progress = t / this.maxDay,
                            SDK().setItem({
                                winCount: t
                            })
                        }
                        .bind(this))
                    }
                }
                .bind(this)),
                this.uiList[this.challengeDay + this.firstDay].win.active = !0,
                this.scheduleOnce(function() {
                    this.winDownAnim()
                }
                .bind(this), .5)))
            },
            winDownAnim: function() {
                this.winCrown.opacity = 0,
                this.winCrown.scale = 5,
                window.gameApplication.soundManager.playSound("getKey"),
                this.winCrown.runAction(cc.spawn(cc.fadeIn(.5), cc.scaleTo(.4, 1).easing(cc.easeIn(3))))
            },
            onDisable: function() {
                window.isPoP && (window.isPoP = !1,
                window.isPlaying = !0)
            },
            onLoad: function() {
                (window.dailyScript = this).challengeDay = 0,
                this.init()
            },
            checkCurDay: function() {
                var t = (new Date).getDate();
                SDK().getItem("challenge" + (t - 1), function(t) {
                    1 == t ? (this.tipsSprite.active = !1,
                    this.tipsSprite1.active = !1) : (this.tipsSprite.active = !0,
                    this.tipsSprite1.active = !0)
                }
                .bind(this))
            },
            init: function() {
                var t = new Date
                  , e = t.getFullYear()
                  , i = t.getMonth()
                  , n = t.getDate();
                n -= 1,
                this.curYear = e,
                this.curMonth = i,
                this.curDay = n,
                this.challengeDay = n,
                this.titleDay.string = n + 1,
                this.titleMonth.string = t.toDateString().split(" ")[1];
                var o = new Date(this.curYear,this.curMonth + 1,0);
                new Date(this.curYear,this.curMonth + 1,1);
                this.maxDay = o.getDate(),
                this.firstDay = o.getDay()
            },
            checkReSet: function() {
                SDK().getItem("ChallengeMonth", function(t) {
                    null == t || 0 == t ? (SDK().setItem({
                        ChallengeMonth: this.curMonth
                    }),
                    this.reSet()) : t != this.curMonth && (SDK().setItem({
                        ChallengeMonth: this.curMonth
                    }),
                    this.reSet())
                }
                .bind(this))
            },
            reSet: function() {
                this.reFresh(!0),
                this.reFresh(!1)
            },
            reFresh: function(t) {
                t ? SDK().setItem({
                    winCount: 0
                }) : SDK().getItem("winCount", function(t) {
                    this.progress.progress = t / this.maxDay,
                    this.progress.progress < .3 ? (this.medalVal[0].color = cc.color(125, 125, 125),
                    this.medalVal[1].color = cc.color(125, 125, 125),
                    this.medalVal[2].color = cc.color(125, 125, 125)) : this.progress.progress < .6 ? (this.medalVal[0].color = cc.color(255, 255, 255),
                    this.medalVal[1].color = cc.color(125, 125, 125),
                    this.medalVal[2].color = cc.color(125, 125, 125)) : this.progress.progress < .9 ? (this.medalVal[0].color = cc.color(255, 255, 255),
                    this.medalVal[1].color = cc.color(255, 255, 255),
                    this.medalVal[2].color = cc.color(125, 125, 125)) : (this.medalVal[0].color = cc.color(255, 255, 255),
                    this.medalVal[1].color = cc.color(255, 255, 255),
                    this.medalVal[2].color = cc.color(255, 255, 255))
                }
                .bind(this));
                for (var e = this.firstDay, i = this.maxDay, n = null, o = 0; o < e; o += 1)
                    null == this.uiList[o] && ((n = cc.instantiate(this.item)).parent = this.content,
                    n.active = !0,
                    this.uiList[o] = {},
                    this.uiList[o].node = n,
                    this.uiList[o].bg = n.getChildByName("Bg").getComponent(cc.Sprite),
                    this.uiList[o].shadow = n.getChildByName("Shadow").getComponent(cc.Sprite),
                    this.uiList[o].day = n.getChildByName("Day").getComponent(cc.Label),
                    this.uiList[o].win = n.getChildByName("Win")),
                    this.uiList[o].bg.node.active = !1,
                    this.uiList[o].shadow.node.active = !1,
                    this.uiList[o].day.node.active = !1,
                    this.uiList[o].win.active = !1;
                for (o = 0; o < i; o += 1)
                    if (null == this.uiList[o + e] && ((n = cc.instantiate(this.item)).parent = this.content,
                    n.active = !0,
                    this.uiList[o + e] = {},
                    this.uiList[o + e].node = n,
                    this.uiList[o + e].bg = n.getChildByName("Bg").getComponent(cc.Sprite),
                    this.uiList[o + e].shadow = n.getChildByName("Shadow").getComponent(cc.Sprite),
                    this.uiList[o + e].day = n.getChildByName("Day").getComponent(cc.Label),
                    this.uiList[o + e].win = n.getChildByName("Win")),
                    this.uiList[o + e].bg.node.active = !0,
                    this.uiList[o + e].shadow.node.active = !1,
                    this.uiList[o + e].day.node.active = !0,
                    this.uiList[o + e].win.active = !1,
                    o <= this.curDay ? (this.uiList[o + e].bg.spriteFrame = this.uiViewAtlas.getSpriteFrame("bg15"),
                    o == this.challengeDay && (this.uiList[o + e].bg.spriteFrame = this.uiViewAtlas.getSpriteFrame("bg16")),
                    o == this.curDay && window.gameApplication.shadowFadeOutAnim(this.uiList[o + e].node, 3, 1.2, !0),
                    this.uiList[o + e].node.off(cc.Node.EventType.TOUCH_END),
                    this.uiList[o + e].node.on(cc.Node.EventType.TOUCH_END, function(t) {
                        this.btnClick(t)
                    }
                    .bind(this), this)) : this.uiList[o + e].bg.spriteFrame = null,
                    this.uiList[o + e].day.string = o + 1,
                    t) {
                        var a = {};
                        a["challenge" + o] = 0,
                        SDK().setItem(a),
                        SDK().getItem("challengeMap", function(t) {
                            null == t || 0 == t ? (t = 1,
                            SDK().setItem({
                                challengeMap: 1
                            })) : (t = (t + 1) % 600 + 1,
                            SDK().setItem({
                                challengeMap: t
                            }))
                        })
                    } else
                        this.checkDay(o)
            },
            checkDay: function(e) {
                SDK().getItem("challenge" + e, function(t) {
                    1 == t && (this.uiList[e + this.firstDay].win.active = !0,
                    this.progress.progress = this.progress.progress + 1 / this.maxDay,
                    e == this.curDay && (this.winCrown.opacity = 255,
                    this.tipsSprite.active = !1,
                    this.tipsSprite1.active = !1))
                }
                .bind(this))
            },
            btnClick: function(t) {
                window.gameApplication.soundManager.playSound("btn_click");
                for (var e = this.firstDay; e < this.firstDay + this.maxDay; e += 1)
                    t.target == this.uiList[e].node && this.challengeDay != e - this.firstDay && (this.uiList[this.challengeDay + this.firstDay].bg.spriteFrame = this.uiViewAtlas.getSpriteFrame("bg15"),
                    this.challengeDay = e - this.firstDay,
                    this.uiList[e].bg.spriteFrame = this.uiViewAtlas.getSpriteFrame("bg16"),
                    this.titleDay.string = this.challengeDay + 1,
                    SDK().getItem("challenge" + this.challengeDay, function(t) {
                        this.winCrown.opacity = 1 == t ? 255 : 0
                    }
                    .bind(this)))
            },
            goChallenge: function() {
                var e;
                window.gameApplication.soundManager.playSound("btn_click"),
                SDK().getItem("challengeMap", function(t) {
                    (e = t - (this.curDay - this.challengeDay)) <= 0 && (e = 600 + e),
                    window.isChallenge = !0,
                    window.challengeIdx = e,
                    window.gameApplication.goChallenge()
                }
                .bind(this))
            },
            backMainView: function() {
                window.gameApplication.soundManager.playSound("btn_click"),
                window.isPoP ? window.gameApplication.openDailyView(!1) : window.gameApplication.openMainView(!0)
            },
            update: function(t) {}
        }),
        cc._RF.pop()
    }
    , {}],
    DataAnalytics: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9b089VPtT9PJLATmP+zACP3", "DataAnalytics");
        var n = {};
        n.init = function() {}
        ,
        n.login = function(t) {
            1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            3 < arguments.length && void 0 !== arguments[3] && arguments[3]
        }
        ,
        n.logout = function(t) {}
        ,
        n.createAPart = function(t) {
            t.gameServer = "platform" + cc.sys.platform
        }
        ,
        n.payBegin = function(t) {
            var e = Date.now().toString();
            t.payTime = e
        }
        ,
        n.paySuccess = function(t) {
            var e = Date.now().toString();
            t.payTime = e
        }
        ,
        n.levelBegin = function(t) {}
        ,
        n.levelResult = function(t, e) {
            console.log(e)
        }
        ,
        n.gameHideAndShow = function(t) {}
        ,
        n.doEvent = function(t) {}
        ,
        n.dealItem = function(t, e) {
            0 == t && cocosAnalytics.CAItem.buy(e)
        }
        ,
        e.exports = n,
        cc._RF.pop()
    }
    , {}],
    EndView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "87f63DVERlBpr7JG4vBURms", "EndView");
        var n = t("../UI/SpriteAnimation")
          , o = 2 * Math.PI / 360;
        cc.Class({
            extends: cc.Component,
            properties: {
                reward: {
                    default: null,
                    type: cc.Node
                },
                rewardBgLight: {
                    default: null,
                    type: cc.Node
                },
                boomFlower: {
                    default: null,
                    type: cc.Node
                },
                FlowerList: {
                    default: [],
                    type: [cc.Node],
                    visible: !1
                },
                tickerList: {
                    default: [],
                    type: [cc.Node],
                    visible: !1
                },
                maskList: {
                    default: [],
                    type: [cc.Animation]
                },
                whiteList: {
                    default: [],
                    type: [cc.Node]
                },
                backBtn: {
                    default: null,
                    type: cc.Node
                },
                giftAnim: {
                    default: null,
                    type: n
                },
                giftBtn: {
                    default: null,
                    type: cc.Node
                },
                giftBtnLight: {
                    default: null,
                    type: cc.Node
                },
                nextBtn: {
                    default: null,
                    type: cc.Node
                },
                adSprite: {
                    default: null,
                    type: cc.Sprite
                },
                adSaver: {
                    default: null,
                    visible: !1
                },
                titel: {
                    default: null,
                    type: cc.Node
                },
                titel2: {
                    default: null,
                    type: cc.Node
                },
                stars: {
                    default: [],
                    type: [cc.Node]
                },
                timeLable: {
                    default: null,
                    type: cc.Label
                },
                starLable: {
                    default: null,
                    type: cc.Label
                },
                lightBoom: {
                    default: null,
                    type: cc.Animation
                },
                worldBtn: {
                    default: null,
                    type: cc.Node
                },
                friendBtn: {
                    default: null,
                    type: cc.Node
                },
                worldList: {
                    default: null,
                    type: cc.Node
                },
                friendList: {
                    default: null,
                    type: cc.Node
                },
                worldContent: {
                    default: null,
                    type: cc.Node
                },
                friendContent: {
                    default: null,
                    type: cc.Node
                },
                headSpriteList: {
                    default: {},
                    visible: !1
                },
                worldPlayer: {
                    default: [],
                    visible: !1
                },
                friendPlayer: {
                    default: [],
                    visible: !1
                },
                worldUIPlayer: {
                    default: [],
                    visible: !1
                },
                friendUIPlayer: {
                    default: [],
                    visible: !1
                },
                prefab_player: {
                    default: null,
                    type: cc.Prefab
                }
            },
            onEnable: function() {
                this.initData(),
                SDK().getRecommendGames(1, function(t, e) {
                    null != e.data.rows[0].pic5 && "" != e.data.rows[0].pic5 && (window.gameApplication.LoadSprite(e.data.rows[0].pic5, this.adSprite, this.adSaver, cc.v2(this.adSprite.node.width, this.adSprite.node.height)),
                    this.adSprite.node.off(cc.Node.EventType.TOUCH_END),
                    this.adSprite.node.on(cc.Node.EventType.TOUCH_END, function(t) {
                        SDK().switchGameAsync(e.data.rows[0].game_id)
                    }, this))
                }
                .bind(this)),
                gameApplication.popGameView.active = !0
            },
            onDisable: function() {
                gameApplication.popGameView.active = !1
            },
            start: function() {},
            btnClick: function(t, e) {
                "WorldRank" == e ? (this.GetWorldRank(this.worldPlayer),
                this.worldList.active = !0,
                this.worldBtn.active = !0,
                this.friendList.active = !1,
                this.friendBtn.active = !1) : "FriendRank" == e ? (this.GetFriendRank(this.friendPlayer),
                this.worldList.active = !1,
                this.worldBtn.active = !1,
                this.friendList.active = !0,
                this.friendBtn.active = !0) : "Gift" == e ? window.gameApplication.onGiftBtnClick(function(t) {
                    t && (this.giftBtn.stopAllActions(),
                    this.giftBtnLight.stopAllActions(),
                    this.giftBtn.scale = 1,
                    this.giftBtnLight.opacity = 0,
                    SDK().getItem("tips", function(t) {
                        window.gameApplication.soundManager.playSound("parBoom"),
                        t += 2,
                        SDK().setItem({
                            tips: t
                        }, null),
                        this.giftAnim.playSprites("gift_", 13, 0, 1, 10, !1, !1),
                        this.scheduleOnce(function() {
                            this.boomFlowerAction()
                        }
                        .bind(this), .5),
                        window.tipText.string = t
                    }
                    .bind(this)))
                }
                .bind(this)) : "Back" == e && (window.isChallenge ? window.gameApplication.openDailyView(!0) : window.gameApplication.gamingBackToLevel(window.bid, window.mid))
            },
            boomFlowerAction: function() {
                this.boomFlower.active = !0;
                for (var t = 0; t < 33; t += 1)
                    null == this.FlowerList[t] && (this.FlowerList[t] = this.boomFlower.getChildByName("Chip" + t)),
                    this.boomFlowerAnim(this.FlowerList[t]);
                for (t = 0; t < 21; t += 1)
                    null == this.tickerList[t] && (this.tickerList[t] = this.boomFlower.getChildByName("TickerTape" + t)),
                    this.boomTickerAnim(this.tickerList[t]);
                window.gameApplication.upAndScale(this.reward, 1, 1),
                this.rewardBgLight.runAction(cc.repeatForever(cc.rotateBy(4, 360)))
            },
            boomFlowerAnim: function(t) {
                t.stopAllActions(),
                t.position = cc.v2(0, 0),
                t.opacity = 255;
                var e = 400 + 200 * cc.random0To1()
                  , i = 1 * -e + cc.random0To1()
                  , n = 300 * cc.randomMinus1To1();
                t.runAction(cc.spawn(cc.moveBy(3, cc.v2(n, 0)).easing(cc.easeOut(2)), cc.sequence(cc.moveBy(1.5, cc.v2(0, e)).easing(cc.easeOut(2)), cc.spawn(cc.moveBy(1.5, cc.v2(0, i)).easing(cc.easeIn(2)), cc.fadeOut(1.5).easing(cc.easeIn(2))))))
            },
            boomTickerAnim: function(t) {
                t.stopAllActions(),
                t.height = 0,
                t.position = cc.v2(0, 0),
                t.opacity = 255;
                var e = 400 + 200 * cc.random0To1()
                  , i = 400 * cc.randomMinus1To1()
                  , n = Math.atan2(i, e) / o;
                t.rotation = n,
                t.getComponent(cc.Animation).play(),
                t.runAction(cc.spawn(cc.moveBy(1.5, cc.v2(i, 0)).easing(cc.easeOut(2)), cc.moveBy(1.5, cc.v2(0, e)).easing(cc.easeOut(1)), cc.fadeOut(1.5).easing(cc.easeIn(3))))
            },
            crashAnim: function(t, e) {
                t.active = !0,
                this.scheduleOnce(function() {
                    t.runAction(cc.sequence(cc.spawn(cc.fadeIn(.5), cc.scaleTo(.4, 1).easing(cc.easeIn(3))), cc.callFunc(function() {
                        this.lightBoom.node.scale = 1 == e ? 2 : 1.5,
                        this.lightBoom.node.position = t.position,
                        this.lightBoom.play(),
                        window.gameApplication.soundManager.playSound("" + (e + 1))
                    }
                    .bind(this), this)))
                }
                .bind(this), .5 * e)
            },
            initData: function() {
                this.boomFlower.active = !1,
                this.giftAnim.playSpriteByName("gift_", 0);
                var t = window.useTime
                  , e = Math.floor(t / 100)
                  , i = Math.floor(t % 100);
                this.timeLable.string = 0 != t && null != t ? e + ":" + (10 <= i ? i : "0" + i) : "--:--";
                var n = this.node.getChildByName("Light0")
                  , o = this.node.getChildByName("Light1");
                if (this.stars[0].opacity = 0,
                this.stars[1].opacity = 0,
                this.stars[2].opacity = 0,
                this.stars[0].scale = 5,
                this.stars[1].scale = 5,
                this.stars[2].scale = 5,
                window.isWin) {
                    window.gameApplication.soundManager.playSound("winGame");
                    for (var a = 0; a < 3; a += 1)
                        this.maskList[a].node.active = !1,
                        this.whiteList[a].opacity = 0;
                    this.giftBtn.active = !0,
                    this.scheduleOnce(function() {
                        this.backBtn.x = -195,
                        this.backBtn.active = !1
                    }
                    .bind(this), .3),
                    this.nextBtn.active = !0,
                    this.titel.active = !0,
                    this.titel2.active = !1,
                    n.active = !0,
                    o.active = !0,
                    o.runAction(cc.repeatForever(cc.rotateBy(4, 360)));
                    for (a = 0; a < window.score; a += 1)
                        this.crashAnim(this.stars[a], a)
                } else {
                    window.gameApplication.soundManager.playSound("failGame");
                    for (a = 0; a < 3; a += 1)
                        this.maskList[a].node.active = !0,
                        this.maskList[a].play(),
                        this.whiteList[a].opacity = 255,
                        this.whiteList[a].runAction(cc.fadeOut(1).easing(cc.easeIn(3)));
                    this.giftBtn.active = !1,
                    this.scheduleOnce(function() {
                        this.backBtn.x = 0,
                        this.backBtn.active = !0
                    }
                    .bind(this), .3),
                    this.nextBtn.active = !1,
                    this.titel.active = !1,
                    this.titel2.active = !0,
                    n.active = !1,
                    o.active = !1,
                    o.stopAllActions()
                }
            }
        }),
        cc._RF.pop()
    }
    , {
        "../UI/SpriteAnimation": "SpriteAnimation"
    }],
    GameApplication: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f08152UaoRPB64U7d0m5V+q", "GameApplication");
        e("../GameLogic/Player");
        var n = e("../GameLogic/SoundManager")
          , o = e("../GameLogic/ViewManager")
          , a = e("../SDK/DataAnalytics");
        e("../UI/MainView"),
        e("../UI/LevelView");
        cc.Class({
            extends: cc.Component,
            properties: {
                viewManager: {
                    default: null,
                    type: o
                },
                soundManager: {
                    default: null,
                    type: n
                },
                missions: {
                    default: []
                },
                missionsCB: {
                    default: []
                },
                conf: {
                    default: {}
                },
                confCB: {
                    default: []
                },
                VideoView: {
                    default: null,
                    type: cc.Node,
                    visible: !1
                },
                VideoView_prefab: {
                    default: null,
                    type: cc.Prefab
                },
                fbView: {
                    default: null,
                    type: cc.Node,
                    visible: !1
                },
                fbView_prefab: {
                    default: null,
                    type: cc.Prefab
                },
                object_prefab: {
                    default: null,
                    type: cc.Prefab
                },
                viewAtlas: {
                    default: null,
                    type: cc.SpriteAtlas
                },
                curLang: {
                    get: function() {
                        return window.i18n.curLang
                    }
                },
                _playTimes: {
                    default: 0,
                    type: cc.Integer
                },
                playTimes: {
                    get: function() {
                        return this._playTimes
                    },
                    set: function(t) {
                        SDK().plusPlayTimes()
                    }
                },
                popGameView: {
                    default: null,
                    type: cc.Node
                }
            },
            start: function() {
                SDK().init(function() {
                    a.login(SDK().getSelfInfo().id);
                    var t = {
                        level: "gameStart"
                    };
                    gameApplication.DataAnalytics.levelBegin(t)
                }
                .bind(this)),
                SDK().getItem("playingMid", function(e) {
                    0 != e && null != e && null != e || (e = 1),
                    SDK().getItem("playingLid", function(t) {
                        0 != t && null != t && null != t || (t = 1),
                        window.bid = 1,
                        window.mid = e,
                        window.lid = t,
                        window.isGoPlay = !0,
                        window.isChallenge = !1,
                        this.openGameView(!0)
                    }
                    .bind(this))
                }
                .bind(this))
            },
            getConf: function(i, n) {
                null != this.conf[i] ? n && n(this.conf[i]) : cc.loader.loadRes(i, function(t, e) {
                    this.conf[i] = e,
                    null != n && n(e)
                }
                .bind(this))
            },
            popClick: function(t, e) {
                SDK().switchGameAsync(e)
            },
            onLoad: function() {
				this.autoAdapteScreen();
				
                e("LanguageData").init("zh"),
                (this.DataAnalytics = a).init(),
                window.gameApplication = this,
                cc.game.addPersistRootNode(this.node);
                var t = cc.director.getCollisionManager();
                t.enabled = !0,
                t.enabledDebugDraw = !1,
                t.enabledDrawBoundingBox = !1,
                cc.loader.loadRes("conf/missions", function(t, e) {
                    this.missions = e,
                    this.invokeMissionCB()
                }
                .bind(this)),
                this.openMissionView(!0),
                this.openDailyView(!0),
                this.openBeginView(!0),
                window.gameTimes = 1
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            onDestroy: function() {
                cc.director.getCollisionManager().enabled = !1,
                levelDetail.level = "gameStart",
                levelDetail.reason = "",
                gameApplication.DataAnalytics.levelResult(!0, levelDetail),
                a.logout(SDK().getSelfInfo().id)
            },
            getMissions: function(t) {
                null != this.missions && 0 < this.missions.length ? t(this.missions) : this.missionsCB.push(t)
            },
            invokeMissionCB: function() {
                var e = this;
                0 < this.missionsCB.length && this.missionsCB.forEach(function(t) {
                    null != t && t(e.missions)
                })
            },
            setNodeActive: function(t, e, i) {
                var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : 0
                  , o = cc.find("Canvas/" + t);
                if (null != o) {
                    this.viewManager.showView(o, .5, e, i, n);
                    var a = o.getComponent(t);
                    null != a ? null != a.initView && a.initView() : console.log(t + " have not Script!")
                } else
                    console.log(t + " is no exist!")
            },
            closeCurView: function() {
                window.gameApplication.soundManager.playSound("btn_click"),
                this.viewManager.closeCurView()
            },
            openBeginView: function(t) {
                this.setNodeActive("BeginView", t, !0)
            },
            openMainView: function(t) {
                this.setNodeActive("MainView", t, !0)
            },
            openLevelView: function(t, e, i, n) {
                this.setNodeActive("LevelView", n, !0),
                cc.find("Canvas/LevelView").getComponent("LevelView").init(t, e, i)
            },
            openMissionView: function(t) {
                this.setNodeActive("MissionView", t, !1)
            },
            openEndView: function(t) {
                this.setNodeActive("EndView", t, !1)
            },
            openDailyView: function(t) {
                window.gameApplication.soundManager.playSound("btn_click"),
                this.setNodeActive("DailyView", t, !1)
            },
            openGiftView: function(t) {
                this.setNodeActive("GiftView", t, !1)
            },
            openGameView: function(t) {
                this.setNodeActive("GameView", !0, !0)
            },
            gamingBackToLevel: function(t, e) {
                this.openLevelView(t, e, this.missions[e - 1], !0)
            },
            gamingBackToMian: function(t, e) {
                this.openMainView(!0)
            },
            goChallenge: function() {
                this.openGameView(!0)
            },
            showVideoView: function(e) {
                if (null == this.VideoView) {
                    var t = cc.instantiate(this.VideoView_prefab)
                      , i = cc.find("Canvas");
                    t.parent = i,
                    t.width = window.width,
                    t.height = window.height,
                    this.VideoView = t
                }
                this.VideoView.active = !0;
                var n = this.VideoView.getChildByName("Bg").getChildByName("BorderBg4").getChildByName("TipShape").getChildByName("LightSmall");
                n.stopAllActions(),
                n.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(.5), cc.fadeOut(.5), cc.delayTime(.1))));
                var o = this.VideoView.getChildByName("Bg").getChildByName("Sure");
                o.off(cc.Node.EventType.TOUCH_END),
                o.on(cc.Node.EventType.TOUCH_END, function(t) {
                    window.gameApplication.soundManager.playSound("btn_click"),
                    this.onVideoBtnClick(e),
                    this.VideoView.active = !1
                }, this);
                var a = this.VideoView.getChildByName("Bg").getChildByName("Later");
                a.off(cc.Node.EventType.TOUCH_END),
                a.on(cc.Node.EventType.TOUCH_END, function(t) {
                    window.gameApplication.soundManager.playSound("btn_click"),
                    e(!1),
                    this.VideoView.active = !1
                }, this)
            },
            onVideoBtnClick: function(e) {
                SDK().showVideoAd(function(t) {
                    null == t ? (console.log("没有观看成功"),
                    this.fbFail(1),
                    e(!1)) : t ? e(!0) : (console.log("没有观看成功"),
                    this.fbFail(1),
                    e(!1))
                }
                .bind(this))
            },
            onGiftBtnClick: function(t) {
                t(!0)
            },
            onShareBtnClick: function(e) {
                SDK().share(e, function(t) {
                    t ? (console.log("share:" + e),
                    window.misstionScript.checkMission(1, !0),
                    window.misstionScript.checkMission(0, !1)) : this.fbFail(2)
                }
                .bind(this))
            },
            fbFail: function(t) {
                var e = cc.instantiate(this.fbView_prefab)
                  , i = cc.find("Canvas");
                e.parent = i,
                e.width = window.width,
                e.height = window.height;
                var n = e.getChildByName("Okay");
                n.off(cc.Node.EventType.TOUCH_END),
                n.on(cc.Node.EventType.TOUCH_END, function(t) {
                    window.gameApplication.soundManager.playSound("btn_click"),
                    this.fbView.active = !1,
                    n.parent.destroy()
                }, this),
                this.fbView = e,
                1 == t ? (this.fbView.getChildByName("Bg").getChildByName("VideoText").active = !0,
                this.fbView.getChildByName("Bg").getChildByName("ShareText").active = !1) : (this.fbView.getChildByName("Bg").getChildByName("VideoText").active = !1,
                this.fbView.getChildByName("Bg").getChildByName("ShareText").active = !0),
                this.fbView.active = !0,
                this.fbView.setLocalZOrder(101)
            },
            flyTipAnim: function(t) {
                var e = cc.instantiate(this.object_prefab);
                e.getComponent(cc.Sprite).spriteFrame = this.viewAtlas.getSpriteFrame("hintBig"),
                e.parent = cc.find("Canvas"),
                e.position = cc.v2(0, 0),
                e.runAction(cc.sequence(cc.moveBy(1, cc.v2(0, 400)).easing(cc.easeIn(2)), cc.callFunc(function() {
                    e.destroy()
                })))
            },
            shake: function(t) {
                t.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.1, 5).easing(cc.easeIn(2)), cc.rotateTo(.2, -5).easing(cc.easeIn(2)), cc.rotateTo(.2, 5).easing(cc.easeIn(2)), cc.rotateTo(.1, 0).easing(cc.easeIn(2)), cc.delayTime(.5))))
            },
            scaleUpAndDowm: function(t, e, i) {
                t.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(.3, 1.1).easing(cc.easeIn(2)), cc.scaleTo(.6, .9).easing(cc.easeIn(2)), cc.scaleTo(.6, 1.1).easing(cc.easeIn(2)), cc.scaleTo(.6, .9).easing(cc.easeIn(2))))),
                e && i.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(.3).easing(cc.easeIn(2)), cc.fadeOut(.6).easing(cc.easeIn(2)), cc.fadeIn(.6).easing(cc.easeIn(2)), cc.fadeOut(.6).easing(cc.easeIn(2)))))
            },
            shadowFadeOutAnim: function(t, e, i, n) {
                t.stopAllActions();
                var o = t.getChildByName("Shadow");
                o.active = !0,
                o.scale = 1,
                o.opacity = 255,
                n ? o.runAction(cc.repeatForever(cc.sequence(cc.spawn(cc.scaleTo(i, e), cc.fadeOut(i).easing(cc.easeOut(2))), cc.callFunc(function() {
                    o.scale = 1,
                    o.opacity = 255,
                    o.active = !0
                }, this)))) : o.runAction(cc.spawn(cc.scaleTo(i, e), cc.fadeOut(i).easing(cc.easeOut(2))))
            },
            upAndScale: function(t, e, i) {
                t.stopAllActions(),
                t.y = -190,
                t.scale = .2,
                t.opacity = 255,
                t.active = !0,
                t.runAction(cc.sequence(cc.spawn(cc.moveBy(i, cc.v2(0, 200)), cc.scaleTo(i, e)), cc.delayTime(.5), cc.fadeOut(.5).easing(cc.easeOut(2))))
            },
            LoadSprite: function(t, i, n, o) {
                null == n ? cc.loader.load(t, function(t, e) {
                    n = new cc.SpriteFrame(e),
                    i.spriteFrame = n,
                    null != o && (i.node.width = o.x,
                    i.node.height = o.y)
                }) : (i.spriteFrame = n,
                null != o && (i.node.width = o.x,
                i.node.height = o.y))
            },
            onQuitBtnClick: function() {}
        }),
        cc._RF.pop()
    }
    , {
        "../GameLogic/Player": "Player",
        "../GameLogic/SoundManager": "SoundManager",
        "../GameLogic/ViewManager": "ViewManager",
        "../SDK/DataAnalytics": "DataAnalytics",
        "../UI/LevelView": "LevelView",
        "../UI/MainView": "MainView",
        LanguageData: "LanguageData"
    }],
    GameView: [function(t, e, i) {
        "use strict";
        var n;
        cc._RF.push(e, "b9ff9v7f91Cv74Cu4qYgxYL", "GameView");
        t("vm");
        function o(t, e, i) {
            return e in t ? Object.defineProperty(t, e, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : t[e] = i,
            t
        }
        cc.color(255, 138, 138, 255),
        cc.color(255, 240, 138, 255),
        cc.color(183, 255, 138, 255),
        cc.color(138, 228, 255, 255),
        cc.color(192, 138, 255, 255),
        cc.color(204, 71, 71, 255),
        cc.color(236, 214, 66, 255),
        cc.color(115, 216, 52, 255),
        cc.color(70, 183, 218, 255),
        cc.color(133, 63, 214, 255);
        var a = t("../SpriteAnimation");
        cc.Class({
            extends: cc.Component,
            properties: (n = {
                guideMask: {
                    default: null,
                    type: cc.Node
                },
                gameApplication: {
                    default: null,
                    visible: !1
                },
                progress: {
                    default: null,
                    type: cc.ProgressBar
                },
                drawView: {
                    default: null,
                    type: cc.Node
                },
                btns: {
                    default: null,
                    type: cc.Node
                },
                endView: {
                    default: null,
                    type: cc.Node
                },
                giftBtn: {
                    default: null,
                    type: cc.Node
                },
                warn: {
                    default: null,
                    type: cc.Node
                },
                levelText: {
                    default: null,
                    type: cc.Label
                },
                stageText: {
                    default: null,
                    type: cc.Label
                },
                tipText: {
                    default: null,
                    type: cc.Label
                },
                curMahjongs: {
                    default: null,
                    visible: !1
                },
                curMap: {
                    default: null,
                    visible: !1
                },
                leaveStars: {
                    default: [],
                    type: [cc.Sprite]
                },
                selectList: {
                    default: [],
                    visible: !1
                },
                movableList: {
                    default: [],
                    visible: !1
                },
                unMovableList: {
                    default: [],
                    visible: !1
                },
                leaveList: {
                    default: [],
                    visible: !1
                }
            },
            o(n, "movableList", {
                default: [],
                visible: !1
            }),
            o(n, "curHelpIdx", {
                default: [],
                visible: !1
            }),
            o(n, "backList", {
                default: [],
                visible: !1
            }),
            o(n, "isHelping", {
                default: !1,
                visible: !1
            }),
            o(n, "leaveTime", {
                default: 0,
                type: cc.Integer,
                visible: !1
            }),
            o(n, "curMapTime", {
                default: 0,
                type: cc.Integer,
                visible: !1
            }),
            o(n, "curStage", {
                default: 0,
                type: cc.Integer,
                visible: !1
            }),
            o(n, "lid", {
                default: 0,
                type: cc.Integer,
                visible: !1
            }),
            o(n, "reFreshCount", {
                default: 0,
                tpye: cc.Integer,
                visible: !1
            }),
            o(n, "boomBg", {
                default: null,
                type: a
            }),
            o(n, "boomAnim", {
                default: null,
                type: a
            }),
            o(n, "boomAnim1", {
                default: null,
                type: a
            }),
            o(n, "brokenBoomAnim", {
                default: null,
                type: cc.Node
            }),
            o(n, "noBrokenFrame", {
                default: null,
                type: cc.SpriteFrame
            }),
            o(n, "brokenFrame", {
                default: null,
                type: cc.SpriteFrame
            }),
            o(n, "selectAnim", {
                default: [],
                type: [cc.Node]
            }),
            o(n, "isDrawMap", {
                default: !1,
                visible: !1
            }),
            o(n, "mahjongOnZ", {
                default: [],
                visible: !1
            }),
            o(n, "pauseView", {
                default: null,
                type: cc.Node
            }),
            o(n, "musicBtn", {
                default: null,
                type: cc.Toggle
            }),
            o(n, "soundBtn", {
                default: null,
                type: cc.Toggle
            }),
            o(n, "worldBtn", {
                default: null,
                type: cc.Node
            }),
            o(n, "friendBtn", {
                default: null,
                type: cc.Node
            }),
            o(n, "worldList", {
                default: null,
                type: cc.Node
            }),
            o(n, "friendList", {
                default: null,
                type: cc.Node
            }),
            o(n, "worldContent", {
                default: null,
                type: cc.Node
            }),
            o(n, "friendContent", {
                default: null,
                type: cc.Node
            }),
            o(n, "headSpriteList", {
                default: {},
                visible: !1
            }),
            o(n, "worldPlayer", {
                default: [],
                visible: !1
            }),
            o(n, "friendPlayer", {
                default: [],
                visible: !1
            }),
            o(n, "worldUIPlayer", {
                default: [],
                visible: !1
            }),
            o(n, "friendUIPlayer", {
                default: [],
                visible: !1
            }),
            o(n, "gameAtlas", {
                default: null,
                type: cc.SpriteAtlas
            }),
            o(n, "object_prefab", {
                default: null,
                type: cc.Prefab
            }),
            o(n, "prefab_player", {
                default: null,
                type: cc.Prefab
            }),
            o(n, "goShareView", {
                default: null,
                type: cc.Node
            }),
            o(n, "isGuide", {
                default: 10,
                visible: !1
            }),
            n),
            onEnable: function() {
                window.dailyScript.checkCurDay(),
                this.isDrawMap = !1,
                this.drawView.active = !1,
                this.drawView.scaleY = cc.winSize.height / 1136,
                this.drawView.scaleX = cc.winSize.width / 640,
                window.timeGiftScript.giftBtn.active = !0,
                window.timeGiftScript.giftBtn.y = .5 * cc.winSize.height - 80,
                window.timeGiftScript.giftBtn.x = .5 * cc.winSize.width - 100,
                window.misstionScript.reFresh()
            },
            onDisable: function() {
                for (var t = 0; t < 2; t += 1)
                    this.selectAnim[t].tag = 0,
                    this.selectAnim[t].active = !1;
                this.isDrawMap = !1,
                this.drawView.active = !1,
                window.isPlaying = !1,
                this.warn.active = !1,
                this.warn.stopAllActions(),
                window.isGoPlay = !1;
            },
            onLoad: function() {
				this.autoAdapteScreen();
				
                window.tipText = this.tipText,
                SDK().getItem("isFirst", function(t) {
                    0 == t || null == t || null == t ? (SDK().setItem({
                        isFirst: 1
                    }),
                    SDK().setItem({
                        tips: 5
                    }, function() {
                        this.tipText.string = 5,
                        this.isGuide = 0
                    }
                    .bind(this))) : (this.goShareView.active = 0,
                    SDK().getItem("tips", function(t) {
                        this.tipText.string = t
                    }
                    .bind(this)))
                }
                .bind(this)),
                this.boomBg.node.setLocalZOrder(0),
                this.boomAnim.node.setLocalZOrder(0),
                this.boomAnim1.node.setLocalZOrder(200);

				
				//修改
				//this.node.removeComponent(cc.Widget);
				
				//cc.find("DrawView", this.node).removeComponent(cc.Widget);

            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            start: function() {
                this.LoadRank()
            },
            initView: function() {
                window.isChallenge ? this.goChallenge() : this.initGame()
            },
            goChallenge: function() {
                this.drawView.active = !1;
                var e = "conf/level_detail/2/" + window.challengeIdx;
                window.gameApplication.getConf(e, function(t) {
                    null != t && null != t.mahjongs ? (this.curMap = t,
                    this.drawMap(this.curMap)) : console.log(e + " is no find!")
                }
                .bind(this))
            },
            menuClick: function(t, e) {
                if (window.gameApplication.soundManager.playSound("btn_click"),
                "Back" == e) {
                    window.isChallenge ? (window.isChallenge = !1,
                    this.isHelping = !1,
                    window.gameApplication.openMainView(!0)) : window.gameApplication.gamingBackToLevel(window.bid, window.mid),
                    this.pauseView.active = !1;
                    var i = {};
                    i.level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                    i.reason = "回到主界面",
                    gameApplication.DataAnalytics.levelResult(!1, i)
                } else if ("Pause" == e)
                    this.pauseView.active ? (this.pauseView.active = !1,
                    window.isPlaying = !0) : (this.pauseView.active = !0,
                    window.isPlaying = !1,
                    this.musicBtn.isChecked = window.gameApplication.soundManager.isBgOpen,
                    this.soundBtn.isChecked = window.gameApplication.soundManager.isOpen);
                else if ("Music" == e)
                    t.isChecked ? window.gameApplication.soundManager.setBgOpen(!0) : window.gameApplication.soundManager.setBgOpen(!1);
                else if ("Sounds" == e)
                    t.isChecked ? window.gameApplication.soundManager.setIsOpen(!0) : window.gameApplication.soundManager.setIsOpen(!1);
                else if ("Tip" == e) {
                    if (this.isHelping)
                        return;
                    this.isHelping = !0,
                    SDK().getItem("tips", function(i) {
                        0 < i ? (i -= 1,
                        SDK().setItem({
                            tips: i
                        }, null),
                        this.tipText.string = i,
                        this.showTip()) : window.gameApplication.showVideoView(function(t) {
                            if (t) {
                                window.gameApplication.soundManager.playSound("tip"),
                                i = 7,
                                SDK().setItem({
                                    tips: i
                                }, null),
                                this.tipText.string = i;
                                for (var e = 0; e < 8; e += 1)
                                    this.scheduleOnce(function() {
                                        window.gameApplication.flyTipAnim()
                                    }
                                    .bind(this), .2 * e);
                                this.showTip()
                            } else
                                this.isHelping = !1
                        }
                        .bind(this))
                    }
                    .bind(this))
                } else if ("ReGresses" == e)
                    this.regresses();
                else if ("Replay" == e)
                    window.isChallenge ? this.goChallenge() : this.initGame(),
                    this.pauseView.active = !1;
                else if ("Next" == e)
                    if (window.isChallenge)
                        window.gameApplication.openDailyView(!0);
                    else {
                        var n = "conf/level_detail/" + bid + "/" + mid + "/" + (lid + 1);
                        window.gameApplication.getConf(n, function(t) {
                            null != t && null != t.mahjongs ? (this.curMap = t,
                            lid += 1,
                            this.drawMap(this.curMap),
                            window.gameApplication.openEndView(!1),
                            window.gameApplication.getConf("conf/level_detail/" + bid + "/" + mid + "/" + (lid + 1), null)) : (window.gameApplication.openEndView(!1),
                            window.gameApplication.gamingBackToMian(window.bid, window.mid))
                        }
                        .bind(this))
                    }
                else
                    "WorldRank" == e ? (this.GetWorldRank(this.worldPlayer),
                    this.worldList.active = !0,
                    this.worldBtn.active = !0,
                    this.friendList.active = !1,
                    this.friendBtn.active = !1) : "FriendRank" == e ? (SDK().shareBestScore3Times("all"),
                    this.GetFriendRank(this.friendPlayer),
                    this.worldList.active = !1,
                    this.worldBtn.active = !1,
                    this.friendList.active = !0,
                    this.friendBtn.active = !0) : "goShare" == e && (this.goShareView.active = !1,
                    SDK().getItem("all", function(t) {
                        window.gameApplication.onShareBtnClick(t)
                    }
                    .bind(this)))
            },
            initGame: function() {
                var i = this;
                if (null != window.gameApplication)
                    if (window.isChallenge)
                        console.log("challenge");
                    else {
                        var n = window.lid
                          , t = [];
                        t.push(n),
                        1 < n && t.push(n - 1),
                        t.push(n + 1),
                        t.forEach(function(e) {
                            var t = "conf/level_detail/" + bid + "/" + mid + "/" + e;
                            window.gameApplication.getConf(t, function(t) {
                                e == n && (i.curMap = t,
                                i.drawMap(t))
                            })
                        })
                    }
                SDK().getItem("tips", function(t) {
                    null == t && (t = 0,
                    SDK().setItem({
                        tips: 0
                    })),
                    this.tipText.string = t
                }
                .bind(this))
            },
            showTip: function() {
                1 == this.curStage && (window.misstionScript.checkMission(7, !0),
                this.checkCanBump(!0))
            },
            winAction: function(t) {
                window.gameApplication.playTimes++,
                this.warn.active = !1,
                this.warn.stopAllActions(),
                window.isPlaying = !1,
                this.curStage = 2,
                window.misstionScript.checkMission(6, !0),
                window.misstionScript.reFresh();
                var i = this.curMapTime - this.leaveTime;
                if (window.useTime = i,
                t) {
                    window.isWin = !1,
                    (e = {}).level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                    e.reason = "过关",
                    gameApplication.DataAnalytics.levelResult(!0, e),
                    window.isWin = !0;
                    var n = this.leaveTime / this.curMapTime;
                    if (n = .5 < n ? 3 : .25 < n ? 2 : 1,
                    window.score = n,
                    !window.isChallenge) {
                        var o = bid + "_" + mid + "_" + this.lid + "_score"
                          , a = bid + "_" + mid + "_" + this.lid + "_time";
                        SDK().getItem(o, function(e) {
                            if (e < n || null == e) {
                                null == e && (e = 0);
                                var t = {};
                                t[o] = n,
                                SDK().setItem(t),
                                SDK().getItem("all", function(t) {
                                    t = t + n - e,
                                    SDK().setItem({
                                        all: t
                                    }),
                                    SDK().setRankScore(2, t, "{}", null),
                                    this.LoadRank()
                                }
                                .bind(this))
                            }
                        }
                        .bind(this)),
                        SDK().getItem(a, function(t) {
                            if (i < t || 0 == t) {
                                var e = {};
                                e[a] = i,
                                SDK().setItem(e)
                            }
                        }
                        .bind(this))
                    }
                } else {
                    var e;
                    window.isWin = !1,
                    (e = {}).level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                    e.reason = "失败",
                    gameApplication.DataAnalytics.levelResult(!1, e)
                }
                window.gameApplication.openEndView(!0),
                window.timeGiftScript.giftBtn.active = !1
            },
            regresses: function() {
                if (0 < this.backList.length) {
                    var t = this.backList.pop();
                    this.bumpDataDeul(t[0], t[1], 1),
                    this.setMagjongPos(t[0], 1, 0),
                    this.setMagjongPos(t[1], 1, 0)
                }
            },
            checkCanBump: function(t) {
                for (var e = 0; e < this.movableList.length; e += 1)
                    if (1 == this.movableList[e])
                        for (var i = 0; i < this.movableList.length; i += 1)
                            if (1 == this.movableList[i] && this.curMahjongs[e].tag == this.curMahjongs[i].tag && e != i)
                                return t && (window.gameApplication.shake(this.curMahjongs[e]),
                                window.gameApplication.shake(this.curMahjongs[i]),
                                this.curHelpIdx = [e, i]),
                                !(this.reFreshCount = 0);
                this.reFreshCount = this.reFreshCount + 1,
                this.refreshMap()
            },
            refreshMap: function() {
                this.mahjongOnZ = [];
                for (var t = [], e = 0, i = [], n = 0, o = 100, a = 0; a < this.leaveList.length; a += 1)
                    if (null != this.leaveList[a]) {
                        if (0 < this.reFreshCount && 1 == this.movableList[a]) {
                            t.push(a),
                            e += 1;
                            continue
                        }
                        var s = this.leaveList[a]
                          , c = Math.abs(window.midX - s.ux) + Math.abs(window.midY - s.uy);
                        c < o && (o = c),
                        n < c && (n = c),
                        null == this.mahjongOnZ[c] && (this.mahjongOnZ[c] = []),
                        this.mahjongOnZ[c].push(a),
                        e += 1
                    }
                if (2 == e) {
                    var l = 0;
                    for (a = 0; a < this.leaveList.length; a += 1)
                        null != this.leaveList[a] && (0 == l ? (this.leaveList[a].runAction(cc.moveTo(.5, cc.v2(-100, 100))),
                        this.leaveList[a].color = cc.color(255, 255, 255),
                        this.movableList[a] = 1,
                        l++) : (this.leaveList[a].runAction(cc.moveTo(.5, cc.v2(100, 100))),
                        this.leaveList[a].color = cc.color(255, 255, 255),
                        this.movableList[a] = 1));
                    return 0
                }
                if (e <= 0)
                    this.scheduleOnce(function() {
                        this.winAction(!0)
                    }
                    .bind(this), 1.5);
                else {
                    for (a = 0; a < e / 2; a += 1) {
                        var r = a % 42 + 1;
                        i[2 * a] = r,
                        i[2 * a + 1] = r
                    }
                    for (1 < t.length && t.sort(this.randomsort); 0 < t.length; ) {
                        var h = i.pop()
                          , u = t.pop();
                        this.curMahjongs[u].getComponent(cc.Sprite).spriteFrame = this.gameAtlas.getSpriteFrame("" + h),
                        this.curMahjongs[u].tag = h
                    }
                    for (var d = o; d <= n; d += 1)
                        if (null != this.mahjongOnZ[d]) {
                            var p = this.mahjongOnZ[d];
                            1 < p.length && p.sort(this.randomsort);
                            for (u = 0; u < p.length; u += 1) {
                                h = i.pop();
                                this.curMahjongs[p[u]].getComponent(cc.Sprite).spriteFrame = this.gameAtlas.getSpriteFrame("" + h),
                                this.curMahjongs[p[u]].tag = h
                            }
                        }
                    this.checkCanBump()
                }
            },
            getCanMove: function() {
                for (var t = [], e = 0; e < this.movableList.length; e += 1)
                    1 == this.movableList[e] && t.push(e);
                return t
            },
            shake: function() {
                this.tipText.node.parent.parent.runAction(cc.repeatForever(cc.sequence(cc.rotateTo(.1, 5).easing(cc.easeIn(2)), cc.rotateTo(.2, -5).easing(cc.easeIn(2)), cc.rotateTo(.2, 5).easing(cc.easeIn(2)), cc.rotateTo(.1, 0).easing(cc.easeIn(2)), cc.delayTime(.5))))
            },
            tickTack: function() {
                this.tipText.node.parent.parent.stopAllActions(),
                this.tipText.node.parent.parent.rotation = 0,
                this.unschedule(this.shake),
                this.scheduleOnce(this.shake, 5)
            },
            drawMap: function(t) {
                if (!this.isDrawMap) {
                    var e = {};
                    e.playingMid = window.mid,
                    e.playingLid = window.lid,
                    SDK().setItem(e, null),
                    this.tickTack(),
                    this.countTime = 0,
                    window.timeGiftScript.giftBtn.active = !0,
                    this.isDrawMap = !0,
                    this.isHelping = !1,
                    this.leaveStars[2].spriteFrame = this.noBrokenFrame,
                    this.leaveStars[1].spriteFrame = this.noBrokenFrame,
                    this.leaveStars[0].spriteFrame = this.noBrokenFrame,
                    window.gameApplication.scaleUpAndDowm(this.leaveStars[2].node),
                    window.gameApplication.scaleUpAndDowm(this.leaveStars[1].node),
                    window.gameApplication.scaleUpAndDowm(this.leaveStars[0].node),
                    window.isChallenge ? this.stageText.string = "每日挑战" : this.stageText.string = "Level " + (100 * (mid - 1) + t.lid);
                    var i = {};
                    i.level = mid + "0" + (99 < lid ? lid : 9 < lid ? "0" + lid : "00" + lid),
                    gameApplication.DataAnalytics.levelBegin(i),
                    this.selectList = [],
                    this.leaveList = [],
                    this.unMovableList = [],
                    this.movableList = [],
                    this.curMap = [],
                    this.lid = t.lid;
                    var n = t.mahjongs;
                    null == this.curMahjongs && (this.curMahjongs = []),
                    this.curMapTime = 3 * n.length,
                    this.leaveTime = this.curMapTime;
                    for (var o = 0, a = 0; a < n.length; a += 1)
                        o < n[a][2] && (o = n[a][2]);
                    for (a = -1; a <= o + 1; a += 1) {
                        this.curMap[a] = [];
                        for (var s = -2; s < 40; s += 1) {
                            this.curMap[a][s] = [];
                            for (var c = -2; c < 40; c += 1) {
                                this.curMap[a][s][c] = [];
                                for (var l = 0; l < 2; l += 1)
                                    this.curMap[a][s][c][l] = [0, null]
                            }
                        }
                    }
                    for (var r = 0; r <= o + 1; r += 1)
                        this.mahjongOnZ[r] = [];
                    var h = 0
                      , u = 100
                      , d = 0
                      , p = 100;
                    for (a = 0; a < n.length; a += 1) {
                        var f = n[a][0]
                          , g = n[a][1];
                        r = n[a][2];
                        this.curMap[r][f][g] = [1, a],
                        this.curMap[r][f][g + 1] = [1, a],
                        this.curMap[r][f + 1][g] = [1, a],
                        this.curMap[r][f + 1][g + 1] = [1, a],
                        h < f && (h = f),
                        f < u && (u = f),
                        d < g && (d = g),
                        g < p && (p = g)
                    }
                    window.midX = (h + u) / 2 + 1,
                    window.midY = (d + p) / 2;
                    for (a = 0; a < this.curMahjongs.length || a < n.length; a += 1)
                        if (a < n.length) {
                            null == this.curMahjongs[a] && (this.curMahjongs[a] = cc.instantiate(this.object_prefab),
                            this.curMahjongs[a].parent = this.drawView),
                            this.curMahjongs[a].scale = 1,
                            this.curMahjongs[a].anchorY = 0,
                            this.curMahjongs[a].off(cc.Node.EventType.TOUCH_END),
                            this.curMahjongs[a].on(cc.Node.EventType.TOUCH_END, function(t) {
                                this.mahjongClick(t)
                            }, this);
                            var m = n[a][2]
                              , y = n[a][1]
                              , w = n[a][0];
                            this.curMahjongs[a].uz = m,
                            this.curMahjongs[a].ux = w,
                            this.curMahjongs[a].uy = y,
                            this.curMahjongs[a].color = cc.color(255, 255, 255),
                            this.curMahjongs[a].active = !1,
                            this.setMagjongPos(this.curMahjongs[a], .2, a),
                            this.checkMahjong(this.curMahjongs[a]),
                            this.leaveList[a] = this.curMahjongs[a]
                        } else
                            null != this.curMahjongs[a] && (this.curMahjongs[a].active = !1);
                    this.selectAnim[0].tag = 0,
                    this.selectAnim[1].tag = 0,
                    this.refreshMap(),
                    this.checkCanBump(),
                    this.curStage = 1,
                    this.drawView.active = !0,
                    window.isPlaying = !0,
                    this.isDrawMap = !1,
                    window.gameTimes = window.gameTimes + 1,
                    5 == window.gameTimes && (window.gameTimes = 0,
                    this.goShareView.active = !0),
                    this.isGuide < 3 && this.checkCanBump(!0)
                }
            },
            mahjongClick: function(t) {
                if (cc.color(255, 255, 255).equals(t.target.color)) {
                    window.gameApplication.soundManager.playSound("btn_click");
                    var e = this.selectList.pop();
                    if (null != e)
                        if (e.tag == t.target.tag) {
                            e.color = cc.color(255, 255, 255),
                            t.target.color = cc.color(255, 255, 255);
                            for (var i = 0; i < 2; i += 1)
                                this.selectAnim[i].tag = 0,
                                this.selectAnim[i].active = !1;
                            this.backList.push([t.target, e]),
                            this.bumpDataDeul(t.target, e, 0),
                            this.bumpAnim(t.target, e),
                            this.checkCanBump(),
                            this.isGuide = this.isGuide + 1,
                            this.isGuide < 3 && this.checkCanBump(!0)
                        } else {
                            e.color = cc.color(255, 255, 255),
                            t.target.color = cc.color(255, 255, 254),
                            this.selectList.push(t.target);
                            for (i = 0; i < 2; i += 1)
                                if (1 == this.selectAnim[i].tag) {
                                    this.selectAnim[i].position = t.target.position,
                                    this.selectAnim[i].setLocalZOrder(t.target.getLocalZOrder());
                                    var n = cc.find("selectLight", this.selectAnim[i]);
                                    this.selectLightAnim(n);
                                    break
                                }
                        }
                    else {
                        t.target.color = cc.color(255, 255, 254);
                        for (i = 0; i < 2; i += 1)
                            if (0 == this.selectAnim[i].tag) {
                                this.selectAnim[i].tag = 1,
                                this.selectAnim[i].position = t.target.position,
                                this.selectAnim[i].setLocalZOrder(t.target.getLocalZOrder()),
                                this.selectAnim[i].active = !0;
                                n = cc.find("selectLight", this.selectAnim[i]);
                                this.selectLightAnim(n);
                                break
                            }
                        this.selectList.push(t.target)
                    }
                }
            },
            selectLightAnim: function(t) {
                t.stopAllActions(),
                t.scaleX = -2,
                t.scaleY = 2,
                t.runAction(cc.scaleTo(.2, -1, 1))
            },
            setMagjongPos: function(t, e, i) {
                t.rotation = 0;
                var n = t.uz
                  , o = t.ux
                  , a = t.uy;
                t.setLocalZOrder(100 * n - a - o);
                var s = 20 + 62 * (o - window.midX) * .5 + 5 * n
                  , c = 88 * (a - window.midY) * .5 - 44 + 5 * n;
                t.stopAllActions(),
                t.position = cc.v2(s, c + 1e3),
                this.curMahjongs[i].active = !0,
                this.scheduleOnce(function() {
                    this.curMahjongs[i].runAction(cc.sequence(cc.moveTo(e, cc.v2(s, c)), cc.callFunc(function() {
                        window.gameApplication.soundManager.playSound("blockDown")
                    }
                    .bind(this), this)))
                }
                .bind(this), .02 * i)
            },
            bumpDataDeul: function(t, e, i) {
                this.tickTack(),
                this.isHelping && (this.curHelpIdx[0] != this.curMap[t.uz][t.ux][t.uy][1] && this.curHelpIdx[1] != this.curMap[t.uz][t.ux][t.uy][1] || (this.isHelping = !1,
                this.curMahjongs[this.curHelpIdx[0]].stopAllActions(),
                this.curMahjongs[this.curHelpIdx[1]].stopAllActions()),
                this.curHelpIdx[0] != this.curMap[e.uz][e.ux][e.uy][1] && this.curHelpIdx[1] != this.curMap[e.uz][e.ux][e.uy][1] || (this.isHelping = !1,
                this.curMahjongs[this.curHelpIdx[0]].stopAllActions(),
                this.curMahjongs[this.curHelpIdx[1]].stopAllActions())),
                t.stopAllActions(),
                e.stopAllActions(),
                t.rotation = 0,
                (e.rotation = 0) == i ? (t.off(cc.Node.EventType.TOUCH_END),
                e.off(cc.Node.EventType.TOUCH_END),
                this.movableList[this.curMap[t.uz][t.ux][t.uy][1]] = 0,
                this.movableList[this.curMap[e.uz][e.ux][e.uy][1]] = 0,
                this.unMovableList[this.curMap[t.uz][t.ux][t.uy][1]] = 1,
                this.unMovableList[this.curMap[e.uz][e.ux][e.uy][1]] = 1,
                this.leaveList[this.curMap[t.uz][t.ux][t.uy][1]] = null,
                this.leaveList[this.curMap[e.uz][e.ux][e.uy][1]] = null) : (t.on(cc.Node.EventType.TOUCH_END, function(t) {
                    this.mahjongClick(t)
                }, this),
                e.on(cc.Node.EventType.TOUCH_END, function(t) {
                    this.mahjongClick(t)
                }, this),
                this.movableList[this.curMap[t.uz][t.ux][t.uy][1]] = 1,
                this.movableList[this.curMap[e.uz][e.ux][e.uy][1]] = 1,
                this.unMovableList[this.curMap[t.uz][t.ux][t.uy][1]] = 0,
                this.unMovableList[this.curMap[e.uz][e.ux][e.uy][1]] = 0,
                this.leaveList[this.curMap[t.uz][t.ux][t.uy][1]] = this.curMahjongs[this.curMap[t.uz][t.ux][t.uy][1]],
                this.leaveList[this.curMap[e.uz][e.ux][e.uy][1]] = this.curMahjongs[this.curMap[e.uz][e.ux][e.uy][1]]),
                this.curMap[t.uz][t.ux][t.uy][0] = i,
                this.curMap[t.uz][t.ux][t.uy + 1][0] = i,
                this.curMap[t.uz][t.ux + 1][t.uy][0] = i,
                this.curMap[t.uz][t.ux + 1][t.uy + 1][0] = i,
                this.curMap[e.uz][e.ux][e.uy][0] = i,
                this.curMap[e.uz][e.ux][e.uy + 1][0] = i,
                this.curMap[e.uz][e.ux + 1][e.uy][0] = i,
                this.curMap[e.uz][e.ux + 1][e.uy + 1][0] = i,
                this.checkAround(t),
                this.checkAround(e)
            },
            bumpAnim: function(t, e) {
                if (t.ux > e.ux) {
                    var i = t;
                    t = e,
                    e = i
                }
                t.setLocalZOrder(1001),
                e.setLocalZOrder(1e3);
                var n;
                cc.winSize.width,
                cc.winSize.height;
                n = t.uy > window.midY ? 100 : -100;
                var o = [cc.p(-200, n), cc.p(-150, 0), cc.v2(-105, -49.5)];
                t.runAction(cc.sequence(cc.bezierTo(.6, o), cc.delayTime(.05), cc.callFunc(function() {
                    this.boomAnim.node.active = !0,
                    this.boomAnim.playSprites("boomAnim", 5, 0, 1, 30, !0, !1, null, function() {
                        this.boomAnim.node.active = !1
                    }
                    .bind(this))
                }
                .bind(this), this), cc.moveTo(.1, cc.v2(-32, -49.5)), cc.callFunc(function() {
                    window.gameApplication.soundManager.playSound("boom"),
                    this.boomAnim1.node.active = !0,
                    this.boomAnim1.playSprites("boomEnd", 3, 0, 1, 15, !0, !1, null, function() {
                        this.boomAnim1.node.active = !1
                    }
                    .bind(this))
                }
                .bind(this), this), cc.delayTime(.1), cc.callFunc(function() {
                    t.scale = 0,
                    e.scale = 0,
                    this.boomBg.node.active = !0,
                    this.boomBg.playSprites("boomBg", 8, 0, 1, 20, !0, !1, null, function() {
                        this.boomBg.node.active = !1
                    }
                    .bind(this))
                }
                .bind(this), this))),
                n = e.uy > window.midY ? 100 : -100,
                o = [cc.p(200, n), cc.p(150, 0), cc.v2(105, -49.5)],
                e.runAction(cc.sequence(cc.bezierTo(.6, o), cc.delayTime(.05), cc.moveTo(.1, cc.v2(32, -49.5))))
            },
            brokenBoom: function(t, e) {
                this.brokenBoomAnim.position = t.node.position,
                this.brokenBoomAnim.active = !0,
                this.brokenBoomAnim.getComponent("SpriteAnimation").playSprites("crash", 7, 0, 1, 14, !0, !1, null, function() {
                    this.brokenBoomAnim.active = !1
                }
                .bind(this)),
                t.spriteFrame = e,
                t.node.stopAllActions(),
                t.node.scale = 1
            },
            checkAround: function(t) {
                var e = t.uz
                  , i = t.ux
                  , n = t.uy;
                0 < e && (this.checkMahjong(this.curMahjongs[this.curMap[e - 1][i][n][1]]),
                this.checkMahjong(this.curMahjongs[this.curMap[e - 1][i + 1][n][1]]),
                this.checkMahjong(this.curMahjongs[this.curMap[e - 1][i][n + 1][1]]),
                this.checkMahjong(this.curMahjongs[this.curMap[e - 1][i + 1][n + 1][1]])),
                this.checkMahjong(this.curMahjongs[this.curMap[e][i - 1][n][1]]),
                this.checkMahjong(this.curMahjongs[this.curMap[e][i - 1][n + 1][1]]),
                this.checkMahjong(this.curMahjongs[this.curMap[e][i + 2][n][1]]),
                this.checkMahjong(this.curMahjongs[this.curMap[e][i + 2][n + 1][1]])
            },
            checkMahjong: function(t) {
                if (null != t && 0 != this.curMap[t.uz][t.ux][t.uy][0]) {
                    var e = t.uz
                      , i = t.ux
                      , n = t.uy
                      , o = this.curMap[e][i][n][1];
                    switch (1) {
                    case this.curMap[e + 1][i][n][0]:
                    case this.curMap[e + 1][i + 1][n][0]:
                    case this.curMap[e + 1][i][n + 1][0]:
                    case this.curMap[e + 1][i + 1][n + 1][0]:
                        this.curMahjongs[o].color = cc.color(125, 125, 125),
                        this.unMovableList[o] = 1,
                        this.movableList[o] = 0;
                        break;
                    default:
                        1 != this.curMap[e][i - 1][n][0] && 1 != this.curMap[e][i - 1][n + 1][0] || 1 != this.curMap[e][i + 2][n][0] && 1 != this.curMap[e][i + 2][n + 1][0] ? (this.curMahjongs[o].color = cc.color(255, 255, 255),
                        this.unMovableList[o] = 0,
                        this.movableList[o] = 1) : (this.curMahjongs[o].color = cc.color(125, 125, 125),
                        this.unMovableList[o] = 1,
                        this.movableList[o] = 0)
                    }
                }
            },
            update: function(t) {
                1 == this.curStage && window.isPlaying && (this.leaveTime = this.leaveTime - t,
                this.progress.progress = this.leaveTime / this.curMapTime,
                this.progress.progress < .5 && this.leaveStars[2].spriteFrame != this.brokenFrame ? this.brokenBoom(this.leaveStars[2], this.brokenFrame) : this.progress.progress < .25 && this.leaveStars[1].spriteFrame != this.brokenFrame ? this.brokenBoom(this.leaveStars[1], this.brokenFrame) : this.progress.progress < .01 && this.leaveStars[0].spriteFrame != this.brokenFrame && (this.brokenBoom(this.leaveStars[0], this.brokenFrame),
                this.winAction(!1))),
                this.leaveTime <= 10 && 0 == this.warn.active && 1 == this.curStage && (this.warn.active = !0,
                this.warn.runAction(cc.repeatForever(cc.sequence(cc.fadeIn(.5), cc.fadeOut(.5)))));
                var e = this.curMapTime - this.leaveTime;
                (e = Math.floor(e)) % 80 == 0 && this.countTime != e && (this.countTime = e,
                SDK().showInterstitialAd(function(t) {
                    console.log("播放Done")
                }, !1))
            },
            LoadRank: function() {
                SDK().getFriendsInfo(function(t) {
                    this.GetFriendRank(t)
                }
                .bind(this)),
                SDK().getRank(2, 20, 0, function(t) {
                    this.GetWorldRank(t)
                }
                .bind(this))
            },
            GetFriendRank: function(t) {
                var i = this;
                this.friendPlayer = t;
                for (var e = function() {
                    n >= i.friendUIPlayer.length ? (o = cc.instantiate(i.prefab_player),
                    a = o.getChildByName("Mask").getChildByName("Head").getComponent(cc.Sprite),
                    s = o.getChildByName("Name").getComponent(cc.Label),
                    c = o.getChildByName("No"),
                    l = o.getChildByName("Num"),
                    c.active = !1,
                    l.active = !1,
                    i.friendUIPlayer[n] = {},
                    i.friendUIPlayer[n].playerBar = o,
                    i.friendUIPlayer[n].Head = a,
                    i.friendUIPlayer[n].Name = s) : (o = i.friendUIPlayer[n].playerBar,
                    a = i.friendUIPlayer[n].Head,
                    s = i.friendUIPlayer[n].Name),
                    r = o.getChildByName("Play"),
                    s.node.active = !0,
                    o.name = i.friendPlayer[n].id;
                    var e = (h = i).friendPlayer[n].id;
                    r.off(cc.Node.EventType.TOUCH_END),
                    r.on(cc.Node.EventType.TOUCH_END, function(t) {
                        window.gameApplication.soundManager.playSound("btn_click"),
                        SDK().playWith(e, h.highestScore, function(t) {
                            window.gameApplication.openMainView(!0)
                        }
                        .bind(this))
                    }, i),
                    s.string = i.friendPlayer[n].name,
                    o.parent = i.friendContent,
                    i.LoadSprite(i.friendPlayer[n].headUrl, a, i.headSpriteList[i.friendPlayer[n].id])
                }, n = 0; n < this.friendPlayer.length; n += 1) {
                    var o, a, s, c, l, r, h;
                    e()
                }
                if (this.friendPlayer.length < this.friendUIPlayer.length)
                    for (n = this.friendPlayer.length; n < this.friendUIPlayer.length; n += 1)
                        this.friendUIPlayer[n].playerBar.active = !1
            },
            GetWorldRank: function(t) {
                this.worldPlayer = t,
                SDK().getRankScore(2, function(t) {
                    if (null != t) {
                        this.LoadRankData(0, t);
                        for (var e = 1; e <= this.worldPlayer.length; e += 1)
                            this.LoadRankData(e, this.worldPlayer[e - 1])
                    }
                    if (this.worldPlayer.length + 1 < this.worldUIPlayer.length)
                        for (e = this.worldPlayer.length; e < this.worldUIPlayer.length; e += 1)
                            this.worldUIPlayer[e].playerBar.active = !1
                }
                .bind(this))
            },
            LoadRankData: function(t, e) {
                var i, n, o, a, s;
                t >= this.worldUIPlayer.length ? (n = (i = cc.instantiate(this.prefab_player)).getComponent(cc.Sprite),
                o = i.getChildByName("No").getComponent(cc.Label),
                a = i.getChildByName("Num").getComponent(cc.Label),
                s = i.getChildByName("Mask").getChildByName("Head").getComponent(cc.Sprite),
                i.getChildByName("Name").active = !1,
                this.worldUIPlayer[t] = {},
                this.worldUIPlayer[t].playerBar = i,
                this.worldUIPlayer[t].mainBg = n,
                this.worldUIPlayer[t].No = o,
                this.worldUIPlayer[t].Score = a,
                this.worldUIPlayer[t].Head = s) : (i = this.worldUIPlayer[t].playerBar,
                n = this.worldUIPlayer[t].mainBg,
                o = this.worldUIPlayer[t].No,
                a = this.worldUIPlayer[t].Score,
                s = this.worldUIPlayer[t].Head);
                o.node.active = !0,
                a.node.active = !0,
                i.name = e.id,
                i.parent = this.worldContent,
                e.id == SDK().getSelfInfo().id && 0 != t && (i.active = !1),
                i.getChildByName("Play").active = !1,
                o.string = "No:" + e.no,
                a.string = e.score,
                this.LoadSprite(e.headUrl, s, this.headSpriteList[e.id])
            },
            LoadSprite: function(t, i, n) {
                null == n ? cc.loader.load(t, function(t, e) {
                    n = new cc.SpriteFrame(e),
                    i.spriteFrame = n
                }) : i.spriteFrame = n
            }
        }),
        cc._RF.pop()
    }
    , {
        "../SpriteAnimation": "SpriteAnimation",
        vm: 2
    }],
    LanguageData: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
        var n = t("polyglot.min")
          , o = null;
        function a(t) {
            return window.i18n.languages[t]
        }
        function s(t) {
            t && (o ? o.replace(t) : o = new n({
                phrases: t,
                allowMissing: !0
            }))
        }
        window.i18n || (window.i18n = {
            languages: {},
            curLang: ""
        }),
        e.exports = {
            init: function(t) {
                if (t !== window.i18n.curLang) {
                    var e = a(t) || {};
                    window.i18n.curLang = t,
                    s(e),
                    this.inst = o
                }
            },
            t: function(t, e) {
                if (o)
                    return o.t(t, e)
            },
            inst: o,
            updateSceneRenderers: function() {
                for (var t = cc.director.getScene().children, e = [], i = 0; i < t.length; ++i) {
                    var n = t[i].getComponentsInChildren("LocalizedLabel");
                    Array.prototype.push.apply(e, n)
                }
                for (var o = 0; o < e.length; ++o) {
                    e[o].updateLabel()
                }
                for (var a = [], s = 0; s < t.length; ++s) {
                    var c = t[s].getComponentsInChildren("LocalizedSprite");
                    Array.prototype.push.apply(a, c)
                }
                for (var l = 0; l < a.length; ++l) {
                    a[l].updateSprite(window.i18n.curLang)
                }
            }
        },
        cc._RF.pop()
    }
    , {
        "polyglot.min": "polyglot.min"
    }],
    LevelView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f23f1EV0cJDq6BQzHk3MAdR", "LevelView"),
        cc.Class({
            extends: cc.Component,
            properties: {
                scrollView: {
                    default: null,
                    type: cc.ScrollView
                },
                title: {
                    default: null,
                    type: cc.Label
                },
                starts: {
                    default: null,
                    type: cc.Label
                },
                content: {
                    default: null,
                    type: cc.Node
                },
                itemList: {
                    default: [],
                    type: [cc.Node],
                    visible: !1
                },
                levels: {
                    default: {},
                    visible: !1
                },
                curMaxIdx: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                bid: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                mid: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                gameApplication: {
                    default: null,
                    type: Object,
                    visible: !1
                },
                lastLid: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                levelItem: {
                    default: null,
                    type: cc.Node
                }
            },
            onEnable: function() {
                SDK().getItem("all", function(t) {
                    this.starts.getComponent(cc.Label).string = t.toString()
                }
                .bind(this)),
                this.content.active = !0,
                window.timeGiftScript.giftBtn.active = !1,
                window.misstionScript.reFresh()
            },
            onLoad: function() {
                this.gameApplication = cc.find("GameApplication").getComponent("GameApplication"),
                this.scrollView.node.on("scroll-to-bottom", this.scorllToBottom, this)
            },
            scorllToBottom: function(t) {
                this.curMaxIdx < total_level && this.initPart(this.curMaxIdx + 1)
            },
            start: function() {},
            init: function(t, e, i) {
                this.hideAllItem(),
                this.title.string = "",
                null == this.levels || Object.keys(this.levels).length <= 0 || this.bid != t || this.mid != e ? (this.bid = t,
                this.mid = e,
                this.levels = i) : (this.bid = t,
                this.mid = e),
                this.initContents();
                var n = this
                  , o = "conf/level_detail/" + t + "/" + e + "/1";
                window.gameApplication.getConf(o, null),
                SDK().getItem("all", function(t) {
                    n.starts.getComponent(cc.Label).string = t.toString()
                }
                .bind(this))
            },
            initContents: function() {
                var t = this;
                this.title.string = 1 + 100 * (t.levels.mid - 1) + " - " + 100 * t.levels.mid,
                this.lastLid = 0,
                this.bid = t.levels.bid,
                this.mid = t.levels.mid,
                t.initLevels(t.levels)
            },
            initLevels: function(t) {
                this.scrollView.scrollToTop(),
                window.total_level = t.stars,
                this.initPart(1);
                var e = "conf/level_detail/" + this.bid + "/" + this.mid + "/" + window.lastLid;
                window.gameApplication.getConf(e, null),
                this.content.active = !0
            },
            initPart: function(t) {
                cc.log("#----------------------" + total_level);
                for (var e = t; e <= t + 19 || e <= total_level; e += 1)
                    if (t + 19 < e) {
                        if (null != this.itemList[e - 1]) {
                            var i = this.itemList[e - 1]
                              , n = (e.toString(),
                            e);
                            i.tag = n,
                            this.setItem(i, 0, !1, n),
                            this.checkUnLock(i, n)
                        }
                    } else {
                        if (null == this.itemList[e - 1]) {
                            var o = cc.instantiate(this.levelItem);
                            o.parent = this.content,
                            o.active = !0,
                            o.tag = e,
                            this.itemList[e - 1] = o
                        }
                        e.toString(),
                        i = this.itemList[e - 1];
                        if (e > total_level)
                            i.active = !1;
                        else {
                            n = e;
                            i.tag = n,
                            this.setItem(i, 0, !1, n),
                            this.checkUnLock(i, n)
                        }
                    }
                this.curMaxIdx = t + 19
            },
            setInt: function(t, e) {
                cc.sys.localStorage.setItem(t, e.toString())
            },
            getInt: function(t) {
                return Number(cc.sys.localStorage.getItem(t))
            },
            getLevel: function() {
                var t = this.getInt("gamelevel");
                return null != t && 0 != t || (t = 1,
                this.setInt("gamelevel", 1)),
                t
            },
            setLevel: function(t) {
                this.setInt("gamelevel", t)
            },
            checkUnLock: function(e, i) {
                var n = this
                  , o = this.getLevel();
                n.lastLid = o,
                window.lastLid = o,
                window.nowbiglevel = n.levels.mid,
                SDK().getItem(n.bid + "_" + n.mid + "_" + i + "_score", function(t) {
                    n.levels.mid;
                    n.setItem(e, t, !0, i),
                    cc.log("check------------------1---" + i + "--" + n.levels.mid + "----" + o)
                }),
                cc.log("check------------------3")
            },
            setItem: function(o, t, e, i) {
                var n = cc.find("unlock", o);
                n.active = e,
                n.width = 200,
                n.height = 50;
                var a = cc.find("lock", o);
                a.active = !e,
                a.width = 200,
                a.height = 50,
                cc.find("unlock/text", o).getComponent(cc.Label).string = 100 * (this.levels.mid - 1) + i,
                cc.find("unlock/star", o).active = !0,
                cc.find("unlock/star", o).width = t <= 0 ? 0 : 48 * t,
                SDK().getItem(this.bid + "_" + this.mid + "_" + i + "_time", function(t) {
                    var e = cc.find("unlock/time/label", o)
                      , i = Math.floor(t / 100)
                      , n = Math.floor(t % 100);
                    e.getComponent(cc.Label).string = 0 != t && null != t ? i + ":" + (10 <= n ? n : "0" + n) : "--:--"
                }
                .bind(this)),
                o.active = !0
            },
            onLevelItemClicked: function(t) {
                this.content.active && (this.content.active = !1),
                this.gameApplication.soundManager.playSound("btn_click");
                var e = t.target
                  , i = (e.getComponent(cc.Button),
                parseInt(e.tag));
                cc.log("keyiwan----------------" + i + "---" + self.mid);
                var n = this.getLevel();
                if (100 * (window.nowbiglevel - 1) + i <= n)
                    if (cc.log("keyiwan----------------"),
                    i < 1 || (this.lastLid,
                    0))
                        this.content.active = !0;
                    else {
                        if (window.isGoPlay)
                            return;
                        window.isGoPlay = !0,
                        window.bid = this.bid,
                        window.mid = this.mid,
                        window.lid = i,
                        window.isChallenge = !1,
                        window.gameApplication.openGameView(!0)
                    }
                else
                    cc.log("bunengwan----------------"),
                    this.content.active = !0
            },
            hideAllItem: function() {
                this.content.active = !1
            },
            onBackBtnClicked: function() {
                this.hideAllItem(),
                this.gameApplication.openMainView(!0),
                this.gameApplication.soundManager.playSound("btn_click")
            }
        }),
        cc._RF.pop()
    }
    , {}],
    LocalizedLabel: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
        var n = t("LanguageData");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                menu: "i18n/LocalizedLabel"
            },
            properties: {
                dataID: {
                    get: function() {
                        return this._dataID
                    },
                    set: function(t) {
                        this._dataID !== t && (this._dataID = t,
                        this.updateLabel())
                    }
                },
                _dataID: ""
            },
            onLoad: function() {
                n.inst || n.init(),
                this.fetchRender()
            },
            fetchRender: function() {
                var t = this.getComponent(cc.Label);
                if (t)
                    return this.label = t,
                    void this.updateLabel()
            },
            updateLabel: function() {
                this.label ? n.t(this.dataID) && (this.label.string = n.t(this.dataID)) : cc.error("Failed to update localized label, label component is invalid!")
            }
        }),
        cc._RF.pop()
    }
    , {
        LanguageData: "LanguageData"
    }],
    LocalizedSprite: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
        var n = t("SpriteFrameSet");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                inspector: "packages://i18n/inspector/localized-sprite.js",
                menu: "i18n/LocalizedSprite"
            },
            properties: {
                spriteFrameSet: {
                    default: [],
                    type: n
                }
            },
            onLoad: function() {
                this.fetchRender()
            },
            fetchRender: function() {
                var t = this.getComponent(cc.Sprite);
                if (t)
                    return this.sprite = t,
                    void this.updateSprite(window.i18n.curLang)
            },
            getSpriteFrameByLang: function(t) {
                for (var e = 0; e < this.spriteFrameSet.length; ++e)
                    if (this.spriteFrameSet[e].language === t)
                        return this.spriteFrameSet[e].spriteFrame
            },
            updateSprite: function(t) {
                if (this.sprite) {
                    var e = this.getSpriteFrameByLang(t);
                    !e && this.spriteFrameSet[0] && (e = this.spriteFrameSet[0].spriteFrame),
                    this.sprite.spriteFrame = e
                } else
                    cc.error("Failed to update localized sprite, sprite component is invalid!")
            }
        }),
        cc._RF.pop()
    }
    , {
        SpriteFrameSet: "SpriteFrameSet"
    }],
    MainView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "5a326YqAwhD+IfA3lH1oKVk", "MainView"),
        cc.Class({
            extends: cc.Component,
            properties: {
                AdsView: {
                    default: null,
                    type: cc.Node
                },
                noAdsView: {
                    default: null,
                    type: cc.Node
                },
                starts: {
                    default: null,
                    type: cc.Node
                },
                content: {
                    default: null,
                    type: cc.Node
                },
                missionItem: {
                    default: null,
                    type: cc.Node
                },
                missions: {
                    default: null,
                    visible: !1
                },
                gameApplication: {
                    default: null,
                    type: Object,
                    visible: !1
                },
                watchADTip: {
                    default: null,
                    type: cc.Node,
                    visible: !1
                },
                unlock_bid: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                unlock_mid: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                unlock_ad: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                watched_ad: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                missionNodes: {
                    default: {},
                    visible: !1
                }
            },
            onLoad: function() {
				this.autoAdapteScreen();
                this.missions = null,
                this.gameApplication = cc.find("GameApplication").getComponent("GameApplication"),
                this.init()
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            onEnable: function() {
                SDK().getItem("all", function(t) {
                    this.starts.getComponent(cc.Label).string = t.toString()
                }
                .bind(this)),
                window.dailyScript.checkCurDay(),
                this.content.active = !0,
                window.timeGiftScript.giftBtn.active = !1,
                window.misstionScript.reFresh()
            },
            showNoAds: function() {
                this.noAdsView.active = !0
            },
            hideNoAds: function() {
                this.noAdsView.active = !1
            },
            init: function() {
                null == this.missions || Object.keys(this.missions).length <= 0 ? this.gameApplication.getMissions(function(t) {
                    this.missions = t,
                    this.initContents()
                }
                .bind(this)) : this.initContents();
                var e = this;
                SDK().getItem("all", function(t) {
                    e.starts.getComponent(cc.Label).string = t.toString()
                }
                .bind(this))
            },
            initContents: function() {
                this.hideAllItem();
                var e = 0;
                this.missions.forEach(function(t) {
                    this.initMissionItem(t, e),
                    e++
                }
                .bind(this))
            },
            initMissionItem: function(t, e) {
                var i = e
                  , n = cc.instantiate(this.missionItem);
                n.parent = this.content,
                n.active = !0,
                n.tag = e,
                n.getChildByName("title").getComponent(cc.Label).string = "Level";
                t.stars;
                var o = t.bid
                  , a = t.mid;
                t.unlock_ad,
                t.unlock_star;
                this.missionNodes[o + "_" + a] = n,
                SDK().getItem(o + "_" + a, function(t) {
                    cc.find("unlock/count", n).getComponent(cc.Label).string = 1 + 100 * (a - 1) + " - " + 100 * a,
                    cc.find("lock/count", n).getComponent(cc.Label).string = 1 + 100 * (a - 1) + " - " + 100 * a
                }),
                this.isUnlock(i, function(t) {
                    cc.find("unlock", n).active = !0,
                    cc.find("lock", n).active = !1
                })
            },
            showAdsView: function() {
                this.AdsView.active = !0,
                this.AdsView.getChildByName("Bg").getChildByName("Titel").getComponent(cc.RichText).string = "<b><color=#9C9999>Need " + this.unlock_star + " stars,\nUnlock now by watching the AD?</c></b>";
                var t = this.AdsView.getChildByName("AD");
                t.off(cc.Node.EventType.TOUCH_END),
                t.on(cc.Node.EventType.TOUCH_END, function(t) {
                    this.onWatchVideoBtnClicked()
                }, this);
                var e = this.AdsView.getChildByName("Later");
                e.off(cc.Node.EventType.TOUCH_END),
                e.on(cc.Node.EventType.TOUCH_END, function(t) {
                    this.AdsView.active = !1
                }, this)
            },
            onWatchVideoBtnClicked: function() {
                var s = this;
                window.gameApplication.onVideoBtnClick(function(t) {
                    if (t) {
                        this.AdsView.active = !1;
                        var e = s.unlock_bid
                          , i = s.unlock_mid
                          , n = s.unlock_ad;
                        s.watched_ad++;
                        var o = this.missionNodes[e + "_" + i];
                        s.watched_ad >= n ? (s.showLevelPanel(e, i),
                        cc.find("unlock", o).active = !0,
                        cc.find("lock", o).active = !1) : (cc.find("unlock", o).active = !1,
                        cc.find("lock", o).active = !0);
                        var a = {};
                        a["unlock_" + e + "_" + i] = s.watched_ad,
                        SDK().setItem(a, null)
                    }
                }
                .bind(this))
            },
            onMissionItemClicked: function(t) {
                var e = this;
                e.content.active && (e.content.active = !1);
                var i = t.target
                  , n = (i.getComponent(cc.Button),
                parseInt(i.tag))
                  , o = this.missions[n];
                if (null != o) {
                    var a = o.bid
                      , s = o.mid;
                    o.unlock_ad;
                    this.isUnlock(n, function(t) {
                        e.showLevelPanel(a, s)
                    })
                }
            },
            isUnlock: function(t, e) {
                var i = this.missions[t]
                  , n = i.bid
                  , o = i.mid
                  , a = i.unlock_ad
                  , s = i.unlock_star;
                s <= 0 ? e(!0) : SDK().getItem("all", function(t) {
                    s <= t ? e(!0) : SDK().getItem("unlock_" + n + "_" + o, function(t) {
                        e(a <= t)
                    })
                })
            },
            hideAllItem: function() {
                0 < this.content.childrenCount && this.content.children.forEach(function(t) {
                    t.active = !1,
                    t.destroy()
                })
            },
            showLevelPanel: function(t, e) {
                window.gameApplication.openLevelView(t, e, this.missions[e - 1], !0),
                window.gameApplication.soundManager.playSound("btn_click")
            },
            onBackBtnClicked: function() {
                window.gameApplication.openBeginView(!0),
                window.gameApplication.soundManager.playSound("btn_click")
            }
        }),
        cc._RF.pop()
    }
    , {}],
    MissionView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "41f56vjQBJGnqwtH4iXR117", "MissionView");
        var s = [1, 2, 5, 10, 15, 30, 50, 5]
          , c = ["job1", "job1", "job2", "job2", "job2", "job2", "job2", "job3"];
        cc.Class({
            extends: cc.Component,
            properties: {
                curMonth: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                curDay: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                missionVal: {
                    default: [],
                    type: [cc.Float],
                    visible: !1
                },
                progress: {
                    default: [],
                    type: [cc.ProgressBar]
                },
                btns: {
                    default: [],
                    type: [cc.Button]
                },
                tipList: {
                    default: [],
                    type: [cc.Node]
                }
            },
            onEnable: function() {
                this.node.setLocalZOrder(1500);
                for (var t = 0; t < this.btns.length; t += 1)
                    this.btns[t].interactable = !1;
                this.checkReFresh(),
                this.reFresh(),
                window.isPlaying && (window.isPlaying = !1,
                window.isPoP = !0)
            },
            onDisable: function() {
                window.isPoP && (window.isPoP = !1,
                window.isPlaying = !0)
            },
            onLoad: function() {
				this.autoAdapteScreen();
                window.misstionScript = this;
            },
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            checkReFresh: function() {
                var t = new Date
                  , e = t.getMonth()
                  , i = t.getDate();
                this.curMonth = e,
                this.curDay = i,
                SDK().getItem("month", function(t) {
                    null == t || 0 == t ? (SDK().setItem({
                        month: e
                    }),
                    SDK().setItem({
                        day: i
                    }),
                    this.reSet()) : t != e ? (SDK().setItem({
                        month: e
                    }),
                    SDK().setItem({
                        day: i
                    }),
                    this.reSet()) : SDK().getItem("day", function(t) {
                        t != i && (SDK().setItem({
                            day: i
                        }),
                        this.reSet())
                    }
                    .bind(this))
                }
                .bind(this))
            },
            reSet: function() {
                SDK().setItem({
                    job1: 0
                }),
                SDK().setItem({
                    job2: 0
                }),
                SDK().setItem({
                    job3: 0
                });
                for (var t = 0; t < this.btns.length; t += 1) {
                    this.btns[t].node.parent.active = !0,
                    this.btns[t].interactable = !1,
                    this.progress[t].progress = 0;
                    var e = {};
                    e["mission" + t] = 0,
                    SDK().setItem(e)
                }
            },
            reFresh: function() {
                for (var t = 0; t < this.tipList.length; t += 1)
                    this.tipList[t].active = !1;
                for (t = 0; t < this.btns.length; t += 1)
                    this.checkMission(t, !1)
            },
            checkMission: function(i, n) {
                var o = 0
                  , a = c[i];
                SDK().getItem(a, function(t) {
                    if (s[i] <= t) {
                        o = 1,
                        this.progress[i].node.getChildByName("String").getComponent(cc.Label).string = s[i] + "/" + s[i]
                    } else {
                        if (n) {
                            t += 1;
                            var e = {};
                            e["" + a] = t,
                            SDK().setItem(e)
                        }
                        o = t / s[i],
                        this.progress[i].node.getChildByName("String").getComponent(cc.Label).string = t + "/" + s[i]
                    }
                    this.missionVal[i] = o,
                    this.progress[i].progress = this.missionVal[i],
                    1 <= this.missionVal[i] ? this.setBtnStatus(i) : this.btns[i].interactable = !1
                }
                .bind(this))
            },
            setBtnStatus: function(t) {
                var i = t;
                SDK().getItem("mission" + i, function(t) {
                    if (1 == t)
                        this.btns[i].node.parent.active = !1,
                        this.btns[i].interactable = !1;
                    else {
                        this.btns[i].node.parent.active = !0,
                        this.btns[i].interactable = !0;
                        for (var e = 0; e < this.tipList.length; e += 1)
                            this.tipList[e].active = !0
                    }
                }
                .bind(this))
            },
            btnClick: function(t, e) {
                var i = t.target.getComponent(cc.Button);
                i.interactable = !1;
                for (var n = 0; n < s.length; n += 1)
                    if (i == this.btns[n]) {
                        var o = {};
                        o["mission" + n] = 1,
                        SDK().setItem(o)
                    }
                SDK().getItem("tips", function(t) {
                    t += parseInt(e),
                    SDK().setItem({
                        tips: t
                    })
                }
                .bind(this)),
                window.gameApplication.soundManager.playSound("tip");
                for (n = 0; n < e && n <= 10; n += 1)
                    this.scheduleOnce(function() {
                        window.gameApplication.flyTipAnim()
                    }
                    .bind(this), .2 * n);
                this.reFresh()
            },
            closeView: function() {
                window.gameApplication.soundManager.playSound("btn_click"),
                window.gameApplication.openMissionView(!1)
            },
            update: function(t) {}
        }),
        cc._RF.pop()
    }
    , {}],
    NormalAnimation: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "43480EzecBHBogcLHmzK8wB", "NormalAnimation"),
        cc.Class({
            extends: cc.Component,
            properties: {
                loop: !0,
                isplay: !0,
                sprite: {
                    default: null,
                    type: cc.Sprite
                },
                sprites: {
                    default: [],
                    type: [cc.SpriteFrame]
                },
                fps: {
                    default: 5,
                    type: cc.Integer
                },
                index: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                delta: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                rotationForever: !1
            },
            onLoad: function() {
                this.rotationForever && this.rotation()
            },
            rotation: function() {
                var t = cc.repeatForever(cc.rotateBy(.3, 90));
                this.rotationSeq = this.node.runAction(t)
            },
            play: function() {
                this.scheduleOnce(function() {
                    null != this.rotationSeq && this.node.stopAction(this.rotationSeq)
                }, .1),
                this.index = 0,
                this.delta = 0,
                this.isplay = !0,
                this.node.opacity = 255,
                this.sprite.node.active = !0
            },
            update: function(t) {
                if (this.isplay && (this.delta += t,
                0 < this.fps && 0 < this.sprites.length)) {
                    var e = 1 / this.fps;
                    e < this.delta && (this.delta = 0 < e ? this.delta - e : 0,
                    this.sprite.spriteFrame = this.sprites[this.index],
                    this.index = this.index + 1 >= this.sprites.length ? 0 : this.index + 1,
                    this.index <= 0 && 0 == this.loop && (this.rotation(),
                    this.isplay = !1,
                    this.sprite.spriteFrame = this.sprites[0],
                    this.node.opacity = 0))
                }
            }
        }),
        cc._RF.pop()
    }
    , {}],
    Player: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e32198K/PFAYI3D//JNhj6H", "Player"),
        cc.Class({
            extends: cc.Component,
            properties: {
                age: {
                    default: 0,
                    type: cc.Integer
                },
                avatar: {
                    default: ""
                },
                group_id: {
                    default: 0,
                    type: cc.Integer
                },
                is_rebot: {
                    default: 0,
                    type: cc.Integer
                },
                pname: {
                    default: ""
                },
                score: {
                    default: 0,
                    type: cc.Integer
                },
                sex: {
                    default: 0,
                    type: cc.Integer
                },
                user_id: {
                    default: 0,
                    type: cc.Integer
                }
            },
			onLoad:function(){
				this.autoAdapteScreen();
			},
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            setUserInfo: function(t) {
                this.age = t.age,
                this.avatar = t.avatar,
                this.group_id = t.group_id,
                this.is_rebot = t.is_rebot,
                this.pname = this.substrName(t.name, 6),
                this.score = t.score,
                this.sex = t.sex,
                this.user_id = t.user_id
            },
            substrName: function(t, e) {
                if (t.replace(/[\u4e00-\u9fa5]/g, "**").length <= e)
                    return t;
                for (var i = 0, n = "", o = 0; o < t.length && (/[\u4e00-\u9fa5]/.test(t[o]) ? i += 2 : i += 1,
                !(e < i)); o++)
                    n += t[o];
                return n + " ..."
            }
        }),
        cc._RF.pop()
    }
    , {}],
    RotationForever: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fb6faggz8ZGIIj857YwdZTb", "RotationForever"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                var t = cc.repeatForever(cc.rotateBy(.3, 90));
                this.node.runAction(t)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    SDKUtils: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d14deOZzBVA6bqNWaGWZ5SG", "SDKUtils");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
          , o = {};
        Math.sqrt(3);
        o.prefixInteger = function(t, e) {
            return (Array(e).join("0") + t).slice(-e)
        }
        ,
        o.offsetToAxial = function(t) {
            return t.x = t.x - Math.floor(t.y / 2),
            t
        }
        ,
        o.axialToScreen = function(t, e) {
            var i = e * t.y + .5 * e - t.y * lineWidth
              , n = e * t.x + .5 * e - t.x * lineWidth;
            return cc.v2(n, i)
        }
        ,
        o.screenToAxial = function(t, e) {
            var i = cc.v2(0, 0)
              , n = Math.abs(Math.round((t.y - .5 * e) / e))
              , o = Math.abs(Math.round((t.x - .5 * e) / e));
            return i.x = Math.floor((t.x + o * lineWidth) / e),
            i.y = Math.floor((t.y + n * lineWidth) / e),
            i
        }
        ,
        o.calculateCubicZ = function(t) {
            return -t.x - t.y
        }
        ,
        o.axialToOffset = function(t) {
            return t
        }
        ,
        o.getNeighbors = function(t) {
            var e = cc.v2(0, 0)
              , i = [];
            return e.x = t.x + 1,
            e.y = t.y,
            i.push(cc.v2(e.x, e.y)),
            e.x = t.x - 1,
            e.y = t.y,
            i.push(cc.v2(e.x, e.y)),
            e.x = t.x,
            e.y = t.y - 1,
            i.push(cc.v2(e.x, e.y)),
            e.x = t.x,
            e.y = t.y + 1,
            i.push(cc.v2(e.x, e.y)),
            i
        }
        ,
        o.getNeighborsOBJ = function(t) {
            var e = cc.v2(0, 0)
              , i = {};
            return e.x = t.x + 1,
            e.y = t.y,
            i.r = cc.v2(e.x, e.y),
            e.x = t.x - 1,
            e.y = t.y,
            i.l = cc.v2(e.x, e.y),
            e.x = t.x,
            e.y = t.y - 1,
            i.b = cc.v2(e.x, e.y),
            e.x = t.x,
            e.y = t.y + 1,
            i.t = cc.v2(e.x, e.y),
            i
        }
        ,
        o.isNeighbors = function(t, e) {
            for (var i = this.getNeighbors(t), n = !1, o = 0; o < i.length; o++)
                i[o].equals(e) && (n = !0);
            return n
        }
        ,
        o.cloneObj = function(t) {
            var e = t && t.constructor === Array ? [] : {};
            for (var i in t)
                if (t.hasOwnProperty(i)) {
                    if (!t[i]) {
                        e[i] = t[i];
                        continue
                    }
                    e[i] = "object" === n(t[i]) ? o.cloneObj(t[i]) : t[i]
                }
            return e
        }
        ,
        o.GetRandomNum = function(t, e) {
            switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * t + 1, 10);
            case 2:
                return parseInt(Math.random() * (e - t + 1) + t, 10);
            default:
                return 0
            }
        }
        ,
        o.inArray = function(t, e) {
            for (var i = e.length; i--; )
                if (parseInt(e[i]) === parseInt(t))
                    return !0;
            return !1
        }
        ,
        e.exports = o,
        cc._RF.pop()
    }
    , {}],
    SoundManager: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "2e203tup99JJ5nSDvFuy7AM", "SoundManager"),
        cc.Class({
            extends: cc.Component,
            properties: {
                audioSource: {
                    type: cc.AudioSource,
                    default: null
                },
                btn_click: {
                    url: cc.AudioClip,
                    default: null
                },
                reward: {
                    url: cc.AudioClip,
                    default: null
                },
                gamewin: {
                    url: cc.AudioClip,
                    default: null
                },
                failGame: {
                    url: cc.AudioClip,
                    default: null
                },
                m1: {
                    url: cc.AudioClip,
                    default: null
                },
                m2: {
                    url: cc.AudioClip,
                    default: null
                },
                m3: {
                    url: cc.AudioClip,
                    default: null
                },
                boom: {
                    url: cc.AudioClip,
                    default: null
                },
                parBoom: {
                    url: cc.AudioClip,
                    default: null
                },
                getKey: {
                    url: cc.AudioClip,
                    default: null
                },
                tip: {
                    url: cc.AudioClip,
                    default: null
                },
                blockDown: {
                    url: cc.AudioClip,
                    default: null
                },
                isOpen: !0,
                isBgOpen: !0,
                isVoiceOpen: !0
            },
            playSound: function(t) {
                if (this.isOpen)
                    switch (t) {
                    case "btn_click":
                        cc.audioEngine.play(this.btn_click, !1, 1);
                        break;
                    case "reward":
                        cc.audioEngine.play(this.reward, !1, 1);
                        break;
                    case "winGame":
                        cc.audioEngine.play(this.gamewin, !1, 1);
                        break;
                    case "failGame":
                        cc.audioEngine.play(this.failGame, !1, 1);
                        break;
                    case "getKey":
                        cc.audioEngine.play(this.getKey, !1, 1);
                        break;
                    case "parBoom":
                        cc.audioEngine.play(this.parBoom, !1, 1);
                        break;
                    case "boom":
                        cc.audioEngine.play(this.boom, !1, 1.5);
                        break;
                    case "1":
                        cc.audioEngine.play(this.m1, !1, 1);
                        break;
                    case "2":
                        cc.audioEngine.play(this.m2, !1, 1);
                        break;
                    case "3":
                        cc.audioEngine.play(this.m3, !1, 1);
                        break;
                    case "tip":
                        cc.audioEngine.play(this.tip, !1, .3);
                        break;
                    case "blockDown":
                        cc.audioEngine.play(this.blockDown, !1, .3)
                    }
            },
            playBg: function() {
                this.isBgOpen ? this.audioSource.play() : this.audioSource.stop()
            },
            setVoiceIsOpen: function(t) {
                if (this.isVoiceOpen = t)
                    try {
                        null != str && HiboGameJs.enableMic(0)
                    } catch (t) {}
                else
                    try {
                        null != str && HiboGameJs.enableMic(1)
                    } catch (t) {}
            },
            setBgOpen: function(t) {
                if (this.isBgOpen = t,
                this.isBgOpen)
                    try {
                        null != str && HiboGameJs.mute(0)
                    } catch (t) {}
                else
                    try {
                        null != str && HiboGameJs.mute(1)
                    } catch (t) {}
                this.playBg()
            },
            setIsOpen: function(t) {
                if (this.isOpen = t,
                this.isOpen)
                    try {
                        null != str && HiboGameJs.mute(0)
                    } catch (t) {}
                else
                    try {
                        null != str && HiboGameJs.mute(1)
                    } catch (t) {}
            }
        }),
        cc._RF.pop()
    }
    , {}],
    SpriteAnimation: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "09c1a9oC4hIA6BJVAMcOBlx", "SpriteAnimation"),
        cc.Class({
            extends: cc.Component,
            properties: {
                isPlay: !1,
                loop: !0,
                sprite: {
                    default: null,
                    type: cc.Sprite
                },
                shadow: {
                    default: null,
                    type: cc.Sprite
                },
                itemId: {
                    default: null,
                    visible: !1
                },
                animCount: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                sprites: {
                    default: [],
                    type: [cc.SpriteFrame],
                    visible: !1
                },
                spritesArray: {
                    default: [],
                    visible: !1
                },
                fps: {
                    default: 5,
                    type: cc.Integer,
                    visible: !1
                },
                delta: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                index: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                wait: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                waitDelta: {
                    default: 0,
                    type: cc.Integer,
                    visible: !1
                },
                gameAtlas: {
                    default: null,
                    type: cc.SpriteAtlas
                },
                isInited: !1,
                isRotat: !0,
                oPoint: {
                    default: cc.v2(0, 0)
                },
                callback: {
                    default: null,
                    visible: !1
                }
            },
			onLoad:function(){
				this.autoAdapteScreen();
			},
			autoAdapteScreen:function(){
				// 适配解决方案
				let _canvas = cc.Canvas.instance;
			// 设计分辨率比
				let _rateR = _canvas.designResolution.height/_canvas.designResolution.width;
			// 显示分辨率比
				let _rateV = cc.winSize.height/cc.winSize.width;
				console.log("winSize: rateR: "+_rateR+" rateV: "+_rateV);
				if (_rateV > _rateR)
				{
					_canvas.fitHeight = false;
					_canvas.fitWidth = true;
					console.log("winSize: fitWidth");
				}
				else
				{
					_canvas.fitHeight = true;
					_canvas.fitWidth = false;
					console.log("winSize: fitHeight");
				}
			},
            playSprites: function(t, e, i, n, o, a, s, c, l) {
                var r = this;
                if (this.animCount = 8,
                this.fps = o,
                this.wait = 0,
                this.waitDelta = 0,
                this.scale = null == c ? 1 : c,
                null == i && (i = 0),
                this.isReset = a,
                this.loop = null == s || s,
                this.isRotat = !1,
                this.isInited && this.itemId == t && null != r.spritesArray[t][n])
                    r.sprites = r.spritesArray[t][n],
                    this.play(l);
                else {
                    this.itemId = t,
                    r.spritesArray[t] = [],
                    r.spritesArray[t][n] = [],
                    r.sprites = r.spritesArray[t][n];
                    for (var h = i; h < i + e; h += 1) {
                        var u = this.gameAtlas.getSpriteFrame(this.itemId + h);
                        r.spritesArray[t][n].push(u)
                    }
                    r.isInited = !0,
                    null != r.sprites.length && 0 < r.sprites.length && r.play(l)
                }
            },
            playSpriteByIdx: function(t, e, i) {
                this.sprite.spriteFrame = this.gameAtlas.getSpriteFrame(t + e),
                this.isPlay = !1
            },
            playSpriteByName: function(t, e, i) {
                this.sprite.spriteFrame = this.gameAtlas.getSpriteFrame(t + e),
                this.isPlay = !1
            },
            play: function(t) {
                this.index = 0,
                this.isPlay = !0,
                this.node.scale = this.scale,
                this.node.opacity = 255,
                null != this.shadow && (this.shadow.node.active = !0),
                null != t && (this.callback = t)
            },
            reSet: function() {
                this.index = 0,
                null != this.sprite && (this.sprite.spriteFrame = this.sprites[this.index]),
                this.isPlay = !1,
                this.node.opacity = 255,
                this.node.setRotation(0),
                null != this.shadow && (this.shadow.node.active = !1,
                this.shadow.node.setRotation(0)),
                null != this.callback && this.callback()
            },
            update: function(t) {
                if (null != this.shadow) {
                    var e = this.shadow.node.position
                      , i = cc.v2(this.node.position.x + 10, this.node.position.y - 10);
                    e != i && (this.shadow.node.position = i)
                }
                if (0 < this.wait && this.waitDelta < this.wait)
                    this.waitDelta += t;
                else if (this.isPlay && 0 < this.fps && 0 < this.sprites.length) {
                    this.delta += t;
                    var n = 1 / this.fps;
                    n < this.delta && (this.delta = 0 < n ? this.delta - n : 0,
                    this.sprite.spriteFrame = this.sprites[this.index],
                    null != this.shadow && (this.shadow.spriteFrame = this.sprites[this.index]),
                    this.index + 1 == this.sprites.length && (this.waitDelta = 0,
                    this.loop || (this.isPlay = !1),
                    this.isReset && this.reSet()),
                    this.index = this.index + 1 >= this.sprites.length ? 0 : this.index + 1)
                }
            }
        }),
        cc._RF.pop()
    }
    , {}],
    SpriteFrameSet: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
        var n = cc.Class({
            name: "SpriteFrameSet",
            properties: {
                language: "",
                spriteFrame: cc.SpriteFrame
            }
        });
        e.exports = n,
        cc._RF.pop()
    }
    , {}],
    TimeGift: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6b5575PjZRDgqp4yTL0oQvI", "TimeGift"),
        cc.Class({
            extends: cc.Component,
            properties: {
                giftBtn: {
                    default: null,
                    type: cc.Node
                },
                giftMask: {
                    default: null,
                    type: cc.Node
                },
                giftView: {
                    default: null,
                    type: cc.Node
                },
                giftTip: {
                    default: null,
                    type: cc.Node
                },
                giftTimeText: {
                    default: null,
                    type: cc.Label
                },
                giftTime: {
                    default: 0,
                    visible: !1
                }
            },
            onLoad: function() {
                (window.timeGiftScript = this).node.setLocalZOrder(100),
                SDK().getItem("giftTime", function(t) {
                    this.giftTime = t
                }
                .bind(this))
            },
            openBtn: function() {
                window.gameApplication.soundManager.playSound("btn_click"),
                this.giftTip.active && this.showTimeGiftView()
            },
            start: function() {
                this.checkTime(!0)
            },
            showTimeGiftView: function() {
                this.giftView.active = !0;
                var t = this.giftView.getChildByName("Bg")
                  , i = t.getChildByName("OpenView");
                i.scale = 0,
                i.runAction(cc.spawn(cc.fadeIn(.5), cc.scaleTo(1.2, 1).easing(cc.easeBackInOut())));
                var n = t.getChildByName("ReceiveView");
                i.active = !0,
                n.active = !1;
                var o = n.getChildByName("LightBg")
                  , e = n.getChildByName("Receive")
                  , a = n.getChildByName("Double");
                i.getChildByName("Open").on(cc.Node.EventType.TOUCH_END, function(t) {
                    window.gameApplication.soundManager.playSound("btn_click");
                    var e = Date.parse(new Date);
                    e /= 1e3,
                    this.giftTime = e,
                    SDK().setItem({
                        giftTime: this.giftTime
                    }, null),
                    SDK().getItem("tips", function(t) {
                        t += 2,
                        SDK().setItem({
                            tips: t
                        }, null),
                        null != window.tipText && (window.tipText.string = t)
                    }
                    .bind(this)),
                    o.runAction(cc.repeatForever(cc.rotateBy(1, 360))),
                    n.active = !0,
                    n.opacity = 0,
                    n.scale = 0,
                    window.gameApplication.soundManager.playSound("parBoom"),
                    i.runAction(cc.spawn(cc.fadeIn(.5), cc.scaleTo(.5, 0).easing(cc.easeBackInOut()))),
                    n.runAction(cc.spawn(cc.fadeIn(.5), cc.scaleTo(1.2, 1).easing(cc.easeBackInOut())))
                }, this),
                e.on(cc.Node.EventType.TOUCH_END, function(t) {
                    window.gameApplication.soundManager.playSound("btn_click"),
                    this.giftView.active = !1,
                    window.gameApplication.soundManager.playSound("tip");
                    for (var e = 0; e < 2; e += 1)
                        this.scheduleOnce(function() {
                            window.gameApplication.flyTipAnim()
                        }
                        .bind(this), .2 * e)
                }, this),
                a.on(cc.Node.EventType.TOUCH_END, function(t) {
                    window.gameApplication.soundManager.playSound("btn_click"),
                    window.gameApplication.onVideoBtnClick(function(t) {
                        if (t) {
                            SDK().getItem("tips", function(t) {
                                t += 2,
                                SDK().setItem({
                                    tips: t
                                }, null),
                                null != window.tipText && (window.tipText.string = t)
                            }
                            .bind(this)),
                            this.giftView.active = !1,
                            window.gameApplication.soundManager.playSound("tip");
                            for (var e = 0; e < 4; e += 1)
                                this.scheduleOnce(function() {
                                    window.gameApplication.flyTipAnim()
                                }
                                .bind(this), .2 * e)
                        }
                    }
                    .bind(this))
                }, this)
            },
            checkTime: function(t) {
                var e = Date.parse(new Date);
                if (3600 < (e /= 1e3) - this.giftTime)
                    (!this.giftTip.active && this.giftMask.active || t) && (this.giftTip.active = !0,
                    this.giftMask.active = !1,
                    this.giftTimeText.node.active = !1);
                else {
                    (this.giftTip.active && !this.giftMask.active || t) && (this.giftTip.active = !1,
                    this.giftTip.stopAllActions(),
                    this.giftMask.active = !0,
                    this.giftTimeText.node.active = !0,
                    this.giftBtn.stopAllActions(),
                    this.giftBtn.scale = 1);
                    var i = e - this.giftTime
                      , n = (i = 3600 - i) / 60 < 10 ? "0" + Math.floor(i / 60) : "" + Math.floor(i / 60)
                      , o = i % 60 < 10 ? "0" + Math.floor(i % 60) : "" + Math.floor(i % 60);
                    i <= 0 && (o = n = "00"),
                    this.giftTimeText.string = n + "/" + o
                }
            },
            update: function(t) {
                this.checkTime(!1)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    Utils: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "3e427LrtQhKv7l/kjbf8v9+", "Utils");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
          , o = {}
          , h = Math.sqrt(3);
        o.offsetToAxial = function(t) {
            return t.x = t.x - Math.floor(t.y / 2),
            t
        }
        ,
        o.axialToScreen = function(t, e) {
            var i = e * t.y + .5 * e - t.y * lineWidth
              , n = e * t.x + .5 * e - t.x * lineWidth;
            return cc.v2(n, i)
        }
        ,
        o.screenToAxial = function(t, e) {
            var i = cc.v2(0, 0);
            i.y = t.x / (1.5 * e),
            i.x = (t.y - t.x / h) / (h * e);
            var n = this.calculateCubicZ(i)
              , o = Math.round(i.x)
              , a = Math.round(i.y)
              , s = Math.round(n);
            if (o + a + s == 0)
                t.x = o,
                t.y = a;
            else {
                var c = Math.abs(i.x - o)
                  , l = Math.abs(i.y - a)
                  , r = Math.abs(n - s);
                l < c && r < c ? (t.x = -a - s,
                t.y = a) : c < l && r < l ? (t.x = o,
                t.y = -o - s) : c < r && l < r && (t.x = o,
                t.y = a)
            }
            return t
        }
        ,
        o.calculateCubicZ = function(t) {
            return -t.x - t.y
        }
        ,
        o.axialToOffset = function(t) {
            return t.x = t.x + Math.floor(t.y / 2),
            t
        }
        ,
        o.getNeighbors = function(t) {
            var e = cc.v2(0, 0)
              , i = [];
            return e.x = t.x + 1,
            e.y = t.y,
            i.push(cc.v2(e.x, e.y)),
            e.x = t.x - 1,
            e.y = t.y,
            i.push(cc.v2(e.x, e.y)),
            e.x = t.x,
            e.y = t.y - 1,
            i.push(cc.v2(e.x, e.y)),
            e.x = t.x,
            e.y = t.y + 1,
            i.push(cc.v2(e.x, e.y)),
            i
        }
        ,
        o.getNeighborsOBJ = function(t) {
            var e = cc.v2(0, 0)
              , i = {};
            return e.x = t.x + 1,
            e.y = t.y,
            i.r = cc.v2(e.x, e.y),
            e.x = t.x - 1,
            e.y = t.y,
            i.l = cc.v2(e.x, e.y),
            e.x = t.x,
            e.y = t.y - 1,
            i.b = cc.v2(e.x, e.y),
            e.x = t.x,
            e.y = t.y + 1,
            i.t = cc.v2(e.x, e.y),
            i
        }
        ,
        o.isNeighbors = function(t, e) {
            for (var i = this.getNeighbors(t), n = !1, o = 0; o < i.length; o++)
                i[o].equals(e) && (n = !0);
            return n
        }
        ,
        o.cloneObj = function(t) {
            var e = t && t.constructor === Array ? [] : {};
            for (var i in t)
                if (t.hasOwnProperty(i)) {
                    if (!t[i]) {
                        e[i] = t[i];
                        continue
                    }
                    e[i] = "object" === n(t[i]) ? o.cloneObj(t[i]) : t[i]
                }
            return e
        }
        ,
        o.GetRandomNum = function(t, e) {
            switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * t + 1, 10);
            case 2:
                return parseInt(Math.random() * (e - t + 1) + t, 10);
            default:
                return 0
            }
        }
        ,
        o.inArray = function(t, e) {
            for (var i = e.length; i--; )
                if (parseInt(e[i]) === parseInt(t))
                    return !0;
            return !1
        }
        ,
        e.exports = o,
        cc._RF.pop()
    }
    , {}],
    ViewManager: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cab2b4euhZPz6zQk00aArxr", "ViewManager"),
        cc.Class({
            extends: cc.Component,
            properties: {
                viewList: {
                    default: [],
                    type: [cc.Node],
                    visible: !1
                },
                viewBtns: {
                    default: [],
                    visible: !1
                },
                curView: {
                    default: null,
                    type: cc.Node,
                    visible: !1
                }
            },
            onLoad: function() {},
            showView: function(t, e, i) {
                for (var n, o = !(3 < arguments.length && void 0 !== arguments[3]) || arguments[3], a = 4 < arguments.length && void 0 !== arguments[4] ? arguments[4] : 0, s = arguments[5], c = !0, l = 0; l < this.viewList.length; l += 1)
                    t == this.viewList[l] ? (c = !1,
                    n = l) : this.viewList[l].active && i && o && (this.viewList[l].stopAllActions(),
                    this.showAnim(this.viewList[l], .3, l, !1));
                if (c) {
                    n = this.viewList.length,
                    this.viewList[n] = t,
                    this.viewBtns[n] = [];
                    var r = [];
                    r = t.getChildren();
                    for (l = 0; l < r.length; l += 1) {
                        var h = r[l].getComponent(cc.Button);
                        if (null != h)
                            this.viewBtns[n][this.viewBtns[n].length] = h;
                        else {
                            var u = [];
                            u = r[l].getChildren();
                            for (var d = 0; d < u.length; d += 1) {
                                var p = u[d].getComponent(cc.Button);
                                if (null != p)
                                    this.viewBtns[n][this.viewBtns[n].length] = p;
                                else {
                                    var f = [];
                                    f = u[d].getChildren();
                                    for (var g = 0; g < f.length; g += 1) {
                                        var m = f[g].getComponent(cc.Button);
                                        if (null != m)
                                            this.viewBtns[n][this.viewBtns[n].length] = m;
                                        else {
                                            var y = [];
                                            y = f[g].getChildren();
                                            for (var w = 0; w < y.length; w += 1) {
                                                var v = y[w].getComponent(cc.Button);
                                                if (null != v)
                                                    this.viewBtns[n][this.viewBtns[n].length] = v;
                                                else {
                                                    var b = [];
                                                    b = y[w].getChildren();
                                                    for (var A = 0; A < b.length; A += 1) {
                                                        var S = b[A].getComponent(cc.Button);
                                                        if (null != S)
                                                            this.viewBtns[n][this.viewBtns[n].length] = S;
                                                        else {
                                                            var I = [];
                                                            I = b[A].getChildren();
                                                            for (var C = 0; C < I.length; C += 1) {
                                                                var B = I[C].getComponent(cc.Button);
                                                                null != B && (this.viewBtns[n][this.viewBtns[n].length] = B)
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (0 < a)
                        for (l = 0; l < this.viewBtns[n].length; l += 1)
                            this.viewBtns[n][l].interactable = !1
                }
                this.showAnim(this.viewList[n], e, n, i, a, s)
            },
            showAnim: function(t, e, i, n, o, a) {
                if (n && 0 == t.active) {
                    if (0 == o)
                        for (var s = 0; s < this.viewBtns[i].length; s += 1)
                            null != this.viewBtns[i][s] && (this.viewBtns[i][s].interactable = !0);
                    t.stopAllActions(),
                    (this.curView = t).opacity = 0,
                    t.active = !0,
                    t.runAction(cc.sequence(cc.fadeIn(e), cc.delayTime(o), cc.callFunc(function() {
                        if (0 < o)
                            for (var t = 0; t < this.viewBtns[i].length; t += 1)
                                null != this.viewBtns[i][t] && (this.viewBtns[i][t].interactable = !0);
                        null != a && a()
                    }
                    .bind(this), this)))
                } else if (!n && 1 == t.active) {
                    for (s = 0; s < this.viewBtns[i].length; s += 1)
                        this.viewBtns[i][s].interactable = !1;
                    var c = cc.sequence(cc.fadeOut(e), cc.callFunc(function() {
                        t.active = !1,
                        null != a && a()
                    }
                    .bind(this)));
                    t.runAction(c)
                }
            },
            closeCurView: function() {
                this.curView.active && this.showView(this.curView, .3, !1)
            },
            GetUIPosition: function(t, e, i) {
                var n = e.convertToWorldSpaceAR(t.getPosition())
                  , o = i.convertToNodeSpaceAR(n);
                t.parent = i,
                t.position = o
            },
            removeView: function(t) {
                for (var e = 0; e < this.viewList.length; e += 1)
                    t == this.viewList[e] && this.viewList.splice(e, 1)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    ZoominForever: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0bfed705u9G85RWvZFfoZtO", "ZoominForever"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                var t = cc.repeatForever(cc.sequence(cc.scaleTo(.88, 1.1, 1.1), cc.scaleTo(.88, .9, .9)));
                this.node.runAction(t)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    en: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "8c6d6rX4b5LH43PcfbdRlsr", "en"),
        window.i18n || (window.i18n = {}),
        window.i18n.languages || (window.i18n.languages = {}),
        window.i18n.languages.en = {
            label_text: {
                helpTip: "帮帮我 !!",
                videoText: "视频广告获取失败，再试试？",
                shareText: "请分享给其他好友或者群？",
                getTipText: "通过广告免费获取?",
                mission0: "分享一次!",
                mission1: "分享两次!",
                mission2: "通过 5 关卡!",
                mission3: "通过 10 关卡! ",
                mission4: "通过 15 关卡!",
                mission5: "通过 30 关卡!",
                mission6: "通过 50 关卡!",
                mission7: "使用 5 提示道具!",
                ShareGame: "邀请好友一起玩!"
            }
        },
        cc._RF.pop()
    }
    , {}],
    facebook: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "6542a5UC9RCqLxrtQE6lpYc", "facebook");
        e("./utils/SDKUtils");
        var n, a = e("./script/sdk_ad"), s = "https://haiwai.31home.com:8003/games.recommend", o = "AD_LOADING", c = "AD_LOAD_SUCCESS", l = "AD_COMPLETE", r = "1748806521876728", h = 2, u = 1, d = 1, p = 0, f = "Friends", g = "world", m = {}, y = function() {
            this.cb = null,
            this.videoAd = null,
            this.videoAdState = null,
            this.InterstitialAd = null,
            this.InterstitialAdState = null,
            this.playTimes = 0,
            this.sdk_ad = null
        };
        y.prototype.init = function(t) {
            if ("undefined" == typeof FBInstant)
                return e("LanguageData").init("en"),
                void (null != t && t());
            (this.playTimes = 0,
            this.loadVideoAd(),
            this.loadInterstitialAd(),
            m.name = FBInstant.player.getName(),
            cc.loader.load(FBInstant.player.getPhoto(), function(t, e) {
                m.head = new cc.SpriteFrame(e)
            }),
            m.id = FBInstant.player.getID(),
            null != t && t(),
            "zh_CN" == this.getLocale()) ? e("LanguageData").init("zh") : e("LanguageData").init("en")
        }
        ,
        y.prototype.initOP = function() {
            var s = this
              , c = new XMLHttpRequest;
            c.onreadystatechange = function() {
                if (4 == c.readyState && 200 == c.status) {
                    var t = JSON.parse(c.responseText);
                    if (console.log("response", t),
                    500 != t.code) {
                        var e = t.data
                          , i = e.interstitial_op
                          , n = e.interstitial_count
                          , o = e.video_on
                          , a = e.interstitial_on;
                        s.setUp(o, a, n, i)
                    }
                }
            }
            ,
            c.open("GET", "https://haiwai.31home.com:8003/games.detail?game_id=" + SDK().getGameId(), !0),
            c.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            c.send()
        }
        ,
        y.prototype.setUp = function(t, e, i, n) {
            if (h = i,
            u = t,
            p = n,
            1 <= (d = e) && 1 <= p) {
                var o = cc.find("Canvas/sdk_ad");
                null != o && (this.sdk_ad = o.getComponent(a)),
                this.reLoadOpAd()
            }
        }
        ,
        y.prototype.reLoadOpAd = function() {
            if (null != this.sdk_ad && 1 <= d && 1 <= p) {
                var o = this
                  , a = new XMLHttpRequest;
                a.onreadystatechange = function() {
                    if (4 == a.readyState && 200 == a.status) {
                        var t = JSON.parse(a.responseText);
                        if (500 != t.code) {
                            var e = t.data.rows[0];
                            if (null != e) {
                                var i = e.pic3
                                  , n = e.game_id;
                                o.sdk_ad.setAd(i, n)
                            }
                        }
                    }
                }
                ,
                a.open("GET", s + "?game_id=" + r + "&amount=1", !0),
                a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                a.send()
            }
        }
        ,
        y.prototype.getRecommendGames = function(t, e) {
            var i = new XMLHttpRequest;
            i.onreadystatechange = function() {
                if (4 == i.readyState && 200 == i.status) {
                    var t = JSON.parse(i.responseText);
                    500 != t.code ? null != e && e(!0, t) : null != e && e(!1, {})
                }
            }
            ,
            i.open("GET", s + "?game_id=" + r + "&amount=" + t, !0),
            i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            i.send(),
            console.log(s + "?game_id=" + r + "&amount=" + t)
        }
        ,
        y.prototype.getItem = function(e, i) {
            if ("undefined" == typeof FBInstant) {
                void 0 !== (n = JSON.parse(cc.sys.localStorage.getItem(e))) && null != n || (n = 0),
                i(n, e)
            } else {
                var n = 0;
                FBInstant.player.getDataAsync(["" + e]).then(function(t) {
                    n = void 0 === t[e] ? 0 : t[e],
                    i(n, e)
                })
            }
        }
        ,
        y.prototype.setItem = function(t, e) {
            if ("undefined" == typeof FBInstant) {
                for (var i in t)
                    cc.sys.localStorage.setItem(i, t[i]);
                null != e && e()
            } else
                FBInstant.player.setDataAsync(t).then(function() {
                    null != e && e()
                })
        }
        ,
        y.prototype.getLocale = function() {
            if ("undefined" != typeof FBInstant)
                return FBInstant.getLocale()
        }
        ,
        y.prototype.getGameId = function() {
            return r
        }
        ,
        y.prototype.getName = function() {
            return "undefined" == typeof FBInstant ? "undefined" : FBInstant.player.getName()
        }
        ,
        y.prototype.canCreateShortcutAsync = function(e) {
            "undefined" != typeof FBInstant && FBInstant.canCreateShortcutAsync().then(function(t) {
                t ? FBInstant.createShortcutAsync().then(function() {
                    null != e && e(!0)
                }).catch(function() {
                    null != e && e(!1)
                }) : null != e && e(!1)
            })
        }
        ,
        y.prototype.switchGameAsync = function(t) {
            if ("undefined" == typeof FBInstant)
                return !1;
            FBInstant.switchGameAsync(t).catch(function(t) {})
        }
        ,
        y.prototype.getCatalogAsync = function(e) {
            "undefined" != typeof FBInstant ? FBInstant.payments.getCatalogAsync().then(function(t) {
                console.log(t),
                e(t)
            }) : null != e && e([])
        }
        ,
        y.prototype.purchaseAsync = function(t, e, i) {
            "undefined" != typeof FBInstant ? FBInstant.payments.purchaseAsync({
                productID: t,
                developerPayload: e
            }).then(function(t) {
                console.log(!0, t),
                i(t)
            }).catch(function(t) {
                i(!1, null)
            }) : null != i && i(!1, null)
        }
        ,
        y.prototype.getPurchasesAsync = function(e) {
            "undefined" != typeof FBInstant ? FBInstant.payments.getPurchasesAsync().then(function(t) {
                e(t)
            }).catch(function(t) {
                e([])
            }) : null != e && e(!1, null)
        }
        ,
        y.prototype.consumePurchaseAsync = function(t, e) {
            "undefined" != typeof FBInstant ? FBInstant.payments.consumePurchaseAsync(t).then(function() {
                e(!0)
            }).catch(function(t) {
                e(!1)
            }) : null != e && e(!1, null)
        }
        ,
        y.prototype.share = function(t, e) {
            if ("undefined" != typeof FBInstant) {
                var i = this;
                FBInstant.context.chooseAsync().then(function() {
                    i.doShare(t),
                    null != e && e(!0)
                }).catch(function(t) {
                    null != t.code && "SAME_CONTEXT" == t.code && null != e && e(!1)
                })
            } else
                null != e && e(!0)
        }
        ,
        y.prototype.doShare = function(t) {
            var s = this.getName() + " Allready get " + t + " stars,Can you beat me?";
            this.getName();
            cc.loader.loadRes("texture2d/game_icon", cc.Texture2D, function(t, e) {
                var i = document.createElement("canvas")
                  , n = i.getContext("2d");
                i.width = 600,
                i.height = 420;
                var o = e.getHtmlElementObj();
                n.drawImage(o, 0, 0);
                var a = i.toDataURL("image/png");
                FBInstant.updateAsync({
                    action: "CUSTOM",
                    cta: "Play Game",
                    template: "join_fight",
                    image: a,
                    text: s,
                    data: {
                        myReplayData: "..."
                    },
                    strategy: "IMMEDIATE",
                    notification: "NO_PUSH"
                }).then(function() {})
            })
        }
        ,
        y.prototype.shareBestScore3Times = function(n) {
            SDK().getItem("share_times", function(t) {
                var e = Math.floor(Date.now() / 1e3);
                if (null == t || t <= 0 || t - e < 0) {
                    var i = {};
                    i.share_times = e + 180,
                    SDK().setItem(i, function() {
                        SDK().shareBestScore(n)
                    })
                }
            })
        }
        ,
        y.prototype.shareBestScore = function(t, e) {
            null != t && "" != t || (t = "all"),
            this.getItem(t, function(t) {
                SDK().share(t, function(t) {
                    e && e(t)
                })
            }
            .bind(this))
        }
        ,
        y.prototype.plusPlayTimes = function() {
            this.playTimes++,
            this.showInterstitialAd(function(t) {
                console.log("播放Done")
            }, !1),
            this.canCreateShortcutAsync(),
            1 == this.playTimes && this.canCreateShortcutAsync()
        }
        ,
        y.prototype.openVideoAd = function() {
            return 1 <= u
        }
        ,
        y.prototype.openinterstitialAd = function() {
            return 1 <= d
        }
        ,
        y.prototype.getInterstitialCount = function() {
            return h
        }
        ,
        y.prototype.isPlayOpAD = function() {
            return 10 * cc.random0To1() <= p
        }
        ,
        y.prototype.loadInterstitialAd = function() {
            "undefined" != typeof FBInstant && this.openinterstitialAd() && FBInstant.getInterstitialAdAsync("1748806521876728_1748861741871206").then(function(t) {
                return this.InterstitialAd = t,
                this.InterstitialAdState = o,
                this.InterstitialAd.loadAsync()
            }
            .bind(this)).catch(function(t) {}
            .bind(this)).then(function() {
                this.InterstitialAdState = c
            }
            .bind(this))
        }
        ,
        y.prototype.showInterstitialAd = function(e, t) {
            if (!(d < 1))
                if (null != this.InterstitialAd) {
                    if ("undefined" == typeof FBInstant)
                        return void (e && e(!1));
                    this.InterstitialAd.showAsync().then(function() {
                        this.InterstitialAdState = l,
                        e && e(!0),
                        this.loadInterstitialAd()
                    }
                    .bind(this)).catch(function(t) {
                        this.InterstitialAdState = l,
                        e && e(!1)
                    }
                    .bind(this))
                } else
                    e && e(!1),
                    this.loadInterstitialAd()
        }
        ,
        y.prototype.loadVideoAd = function() {
            "undefined" != typeof FBInstant && this.openVideoAd() && FBInstant.getRewardedVideoAsync("1748806521876728_1748862235204490").then(function(t) {
                return this.videoAd = t,
                this.videoAdState = o,
                this.videoAd.loadAsync()
            }
            .bind(this)).then(function() {
                this.videoAdState = c
            }
            .bind(this))
        }
        ,
        y.prototype.hasVideoAd = function() {
            return "undefined" != typeof FBInstant && null != this.videoAd
        }
        ,
        y.prototype.showVideoAd = function(e) {
            "undefined" != typeof FBInstant ? null != this.videoAd ? this.videoAd.showAsync().then(function() {
                this.videoAdState = l,
                e && e(!0),
                this.loadVideoAd()
            }
            .bind(this)).catch(function(t) {
                this.videoAdState = l,
                e && e(!1),
                this.loadVideoAd()
            }
            .bind(this)) : (e && e(!1),
            this.loadVideoAd()) : e && e(!0)
        }
        ,
        y.prototype.stat = function(t, e) {
            var i = new XMLHttpRequest;
            i.onreadystatechange = function() {
                if (4 == i.readyState && 200 == i.status)
                    JSON.parse(i.responseText)
            }
            ,
            i.open("GET", "https://haiwai.31home.com:8003/games.stat?game_id=" + e + "&type=" + t, !0),
            i.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            i.send()
        }
        ,
        y.prototype.playWith = function(t, e, i) {
            if ("undefined" != typeof FBInstant) {
                var n = this;
                FBInstant.context.createAsync(t).then(function() {
                    n.doShare(e),
                    i(null != i)
                }).catch(i(!1))
            } else
                null != i && i(!0)
        }
        ,
        y.prototype.getFriendsInfo = function(i) {
            if ("undefined" == typeof FBInstant)
                console.log("getFriendsInfo fail"),
                null != i && i({});
            else {
                var n = [];
                FBInstant.player.getConnectedPlayersAsync().then(function(t) {
                    for (var e = 0; e < t.length; e += 1)
                        n[e] = {},
                        n[e].id = t[e].getID(),
                        n[e].name = t[e].getName(),
                        n[e].headUrl = t[e].getPhoto();
                    null != i && i(n)
                })
            }
        }
        ,
        y.prototype.getSelfInfo = function(t) {
            return "undefined" == typeof FBInstant ? (console.log("set rank fail"),
            {
                id: 1
            }) : m
        }
        ,
        y.prototype.setRankScore = function(t, e, i, n) {
            if ("undefined" == typeof FBInstant)
                console.log("set rank fail");
            else {
                var o, a = FBInstant.context.getID();
                if (null != a && (a = "." + a),
                1 == t) {
                    if (o = f,
                    null == a)
                        return console.log(FBInstant.context.getType()),
                        void (a = "")
                } else {
                    if (2 != t)
                        return null != n && n("wrong type"),
                        void console.log("wrong type");
                    o = g,
                    a = ""
                }
                FBInstant.getLeaderboardAsync(o + a).then(function(t) {
                    return console.log(t.getName()),
                    t.setScoreAsync(e, i)
                }).then(function() {
                    return console.log("Score saved")
                }).catch(function(t) {
                    return console.error(t)
                })
            }
        }
        ,
        y.prototype.getRankScore = function(t, i) {
            if ("undefined" == typeof FBInstant)
                console.log("get self rank fail");
            else {
                var e, n = FBInstant.context.getID();
                if (null != n && (n = "." + n),
                1 == t) {
                    if (e = f,
                    null == n)
                        return console.log(FBInstant.context.getType()),
                        void (n = "")
                } else {
                    if (2 != t)
                        return null != i && i("wrong type"),
                        void console.log("wrong type");
                    e = g,
                    n = ""
                }
                FBInstant.getLeaderboardAsync(e + n).then(function(t) {
                    return t.getPlayerEntryAsync()
                }).then(function(t) {
                    if (null != t) {
                        var e = {};
                        e.id = t.getPlayer().getID(),
                        e.no = t.getRank(),
                        e.name = t.getPlayer().getName(),
                        e.score = t.getScore(),
                        e.headUrl = t.getPlayer().getPhoto(),
                        i(e)
                    } else
                        i(null)
                }).catch(function(t) {
                    return console.error(t)
                })
            }
        }
        ,
        y.prototype.getPercent = function(e) {
            "undefined" == typeof FBInstant ? (console.log("get rank fail"),
            null != e && e()) : FBInstant.getLeaderboardAsync("World").then(function(t) {
                return t.getEntryCountAsync()
            }).then(function(t) {
                null != e && e(t)
            })
        }
        ,
        y.prototype.getRank = function(t, e, i, n) {
            if ("undefined" == typeof FBInstant)
                console.log("get rank fail");
            else {
                var o, a = FBInstant.context.getID();
                if (null != a && (a = "." + a),
                1 == t) {
                    if (o = f,
                    null == a)
                        return console.log(FBInstant.context.getType()),
                        a = "",
                        void (null != n && n([]))
                } else {
                    if (2 != t)
                        return null != n && n("wrong type"),
                        void console.log("wrong type");
                    o = g,
                    a = ""
                }
                var s = [];
                FBInstant.getLeaderboardAsync(o + a).then(function(t) {
                    return t.getEntriesAsync(e, i)
                }).then(function(t) {
                    for (var e = 0; e < t.length; e++)
                        s[e] = {},
                        s[e].id = t[e].getPlayer().getID(),
                        s[e].no = t[e].getRank(),
                        s[e].name = t[e].getPlayer().getName(),
                        s[e].score = t[e].getScore(),
                        s[e].headUrl = t[e].getPlayer().getPhoto();
                    null != n && n(s)
                }).catch(function(t) {
                    return console.error(t)
                })
            }
        }
        ,
        y.prototype.postRankToMessage = function(t, e) {
            if ("undefined" == typeof FBInstant)
                console.log("post rank fail");
            else {
                var i, n = FBInstant.context.getID();
                if (null != n && (n = "." + n),
                1 == t) {
                    if (i = f,
                    null == n)
                        return console.log(FBInstant.context.getType()),
                        void (n = "")
                } else {
                    if (2 != t)
                        return null != e && e("wrong type"),
                        void console.log("wrong type");
                    i = g,
                    n = ""
                }
                FBInstant.updateAsync({
                    action: "LEADERBOARD",
                    name: i + n
                }).then(function() {
                    return console.log("Update Posted")
                }).catch(function(t) {
                    return console.error(t)
                })
            }
        }
        ,
        t.exports = function() {
            return n || (n = new y),
            n
        }
        ,
        cc._RF.pop()
    }
    , {
        "./script/sdk_ad": "sdk_ad",
        "./utils/SDKUtils": "SDKUtils",
        LanguageData: "LanguageData"
    }],
    globals: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f774aa2KJxEp68y3WRvT7GZ", "globals"),
        window.SDK = t("../SDK/facebook"),
        window.playTimesAD = 2,
        window.isDebug = !1,
        window.lineWidth = 6,
        window.plusHelp = 5,
        window.openAllLevel = !1,
        cc._RF.pop()
    }
    , {
        "../SDK/facebook": "facebook"
    }],
    "polyglot.min": [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
        var n, o, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t
        }
        : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
        ;
        n = void 0,
        o = function(e) {
            function t(t) {
                t = t || {},
                this.phrases = {},
                this.extend(t.phrases || {}),
                this.currentLocale = t.locale || "en",
                this.allowMissing = !!t.allowMissing,
                this.warn = t.warn || i
            }
            function o(t, e, i) {
                var n, o, a, s, c, l, r;
                return null != i && t ? (a = (o = t.split(h))[(s = e,
                c = i,
                u[(l = s,
                r = function(t) {
                    var e, i, n, o = {};
                    for (e in t)
                        if (t.hasOwnProperty(e))
                            for (n in i = t[e])
                                o[i[n]] = e;
                    return o
                }(d),
                r[l] || r.en)](c))] || o[0],
                n = a.replace(/^\s+|\s+$/g, "")) : n = t,
                n
            }
            function i(t) {
                e.console && e.console.warn && e.console.warn("WARNING: " + t)
            }
            t.VERSION = "0.4.3",
            t.prototype.locale = function(t) {
                return t && (this.currentLocale = t),
                this.currentLocale
            }
            ,
            t.prototype.extend = function(t, e) {
                var i;
                for (var n in t)
                    t.hasOwnProperty(n) && (i = t[n],
                    e && (n = e + "." + n),
                    "object" == (void 0 === i ? "undefined" : a(i)) ? this.extend(i, n) : this.phrases[n] = i)
            }
            ,
            t.prototype.clear = function() {
                this.phrases = {}
            }
            ,
            t.prototype.replace = function(t) {
                this.clear(),
                this.extend(t)
            }
            ,
            t.prototype.t = function(t, e) {
                var i, n;
                return "number" == typeof (e = null == e ? {} : e) && (e = {
                    smart_count: e
                }),
                "string" == typeof this.phrases[t] ? i = this.phrases[t] : "string" == typeof e._ ? i = e._ : this.allowMissing ? i = t : (this.warn('Missing translation for key: "' + t + '"'),
                n = t),
                "string" == typeof i && (e = function(t) {
                    var e = {};
                    for (var i in t)
                        e[i] = t[i];
                    return e
                }(e),
                n = function(t, e) {
                    for (var i in e)
                        "_" !== i && e.hasOwnProperty(i) && (t = t.replace(new RegExp("%\\{" + i + "\\}","g"), e[i]));
                    return t
                }(n = o(i, this.currentLocale, e.smart_count), e)),
                n
            }
            ,
            t.prototype.has = function(t) {
                return t in this.phrases
            }
            ;
            var h = "||||"
              , u = {
                chinese: function(t) {
                    return 0
                },
                german: function(t) {
                    return 1 !== t ? 1 : 0
                },
                french: function(t) {
                    return 1 < t ? 1 : 0
                },
                russian: function(t) {
                    return t % 10 == 1 && t % 100 != 11 ? 0 : 2 <= t % 10 && t % 10 <= 4 && (t % 100 < 10 || 20 <= t % 100) ? 1 : 2
                },
                czech: function(t) {
                    return 1 === t ? 0 : 2 <= t && t <= 4 ? 1 : 2
                },
                polish: function(t) {
                    return 1 === t ? 0 : 2 <= t % 10 && t % 10 <= 4 && (t % 100 < 10 || 20 <= t % 100) ? 1 : 2
                },
                icelandic: function(t) {
                    return t % 10 != 1 || t % 100 == 11 ? 1 : 0
                }
            }
              , d = {
                chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                french: ["fr", "tl", "pt-br"],
                russian: ["hr", "ru"],
                czech: ["cs"],
                polish: ["pl"],
                icelandic: ["is"]
            };
            return t
        }
        ,
        "function" == typeof define && define.amd ? define([], function() {
            return o(n)
        }) : "object" == (void 0 === i ? "undefined" : a(i)) ? e.exports = o(n) : n.Polyglot = o(n),
        cc._RF.pop()
    }
    , {}],
    sdk_ad: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "7bbceGVbB9GqazOzZL48/et", "sdk_ad"),
        cc.Class({
            extends: cc.Component,
            properties: {
                adSprite: {
                    default: null,
                    type: cc.Sprite
                },
                pic: {
                    default: ""
                },
                game_id: {
                    default: ""
                },
                hasAd: !1
            },
            onLoad: function() {},
            show: function() {
                null != this.node && this.node.setPosition(cc.v2(0, 0))
            },
            setAd: function(t, e) {
                if (null != this.node && null != this.adSprite) {
                    this.pic = t,
                    this.game_id = e;
                    var i = this
                      , n = this.pic;
                    cc.loader.load(n, function(t, e) {
                        i.adSprite.spriteFrame = new cc.SpriteFrame(e)
                    }),
                    this.hasAd = !0
                }
            },
            onCloseBtnClicked: function() {
                this.node.setPosition(cc.v2(1500, 1500)),
                SDK().reLoadOpAd(),
                SDK().stat(2, this.game_id)
            },
            onPlayBtnClicked: function() {
                this.onCloseBtnClicked(),
                SDK().switchGameAsync(this.game_id)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    zh: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "052f3sYjnRNDY4qAIzWph5c", "zh"),
        window.i18n || (window.i18n = {}),
        window.i18n.languages || (window.i18n.languages = {}),
        window.i18n.languages.zh = {
            label_text: {
                helpTip: "帮帮我！！",
                videoText: "视频丢失，请稍后再试",
                shareText: "请分享到别的组或者好友",
                getTipText: "没有提示了，看视频拿几个吧",
                mission0: "分享1次 获得2个提示",
                mission1: "分享2次 获得5个提示",
                mission2: "游戏内过5关 获得 1个提示",
                mission3: "游戏内过10关 获得 2个提示",
                mission4: "游戏内过15关 获得 3个提示",
                mission5: "游戏内过30关 获得 6个提示",
                mission6: "游戏内过50关 获得 10个提示",
                mission7: "用5次提示 获得1个提示",
                ShareGame: "和朋友一起玩吧!"
            }
        },
        cc._RF.pop()
    }
    , {}]
}, {}, ["globals", "GameApplication", "Player", "SoundManager", "ViewManager", "DataAnalytics", "facebook", "sdk_ad", "SDKUtils", "BeginView", "AnimFunc", "NormalAnimation", "RotationForever", "ZoominForever", "EndView", "ClickPoint", "DailyView", "GameView", "MissionView", "TimeGift", "LevelView", "MainView", "SpriteAnimation", "Utils", "en", "zh", "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min"]);
