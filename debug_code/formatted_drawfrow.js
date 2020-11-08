/* eslint-disable */
!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.Drawflow = t())
    : (e.Drawflow = t());
})('undefined' != typeof self ? self : this, function () {
  return (function (e) {
    var t = {};
    function n(i) {
      if (t[i]) return t[i].exports;

      var s = (t[i] = {
        i: i,
        l: !1,
        exports: {},
      });
      return e[i].call(s.exports, s, s.exports, n), (s.l = !0), s.exports;
    }
    return (
      (n.m = e),
      (n.c = t),
      (n.d = function (e, t, i) {
        n.o(e, t) ||
          Object.defineProperty(e, t, {
            enumerable: !0,
            get: i,
          });
      }),
      (n.r = function (e) {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', {
            value: !0,
          });
      }),
      (n.t = function (e, t) {
        if ((1 & t && (e = n(e)), 8 & t)) return e;

        if (4 & t && 'object' == typeof e && e && e.__esModule) return e;

        var i = Object.create(null);
        if (
          (n.r(i),
          Object.defineProperty(i, 'default', {
            enumerable: !0,
            value: e,
          }),
          2 & t && 'string' != typeof e)
        )
          for (var s in e)
            n.d(
              i,
              s,
              function (t) {
                return e[t];
              }.bind(null, s)
            );

        return i;
      }),
      (n.n = function (e) {
        var t =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return n.d(t, 'a', t), t;
      }),
      (n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (n.p = ''),
      n((n.s = 0))
    );
  })([
    function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, 'default', function () {
          return i;
        });
      class i {
        constructor(e, t = null) {
          (this.events = {}),
            (this.container = e),
            (this.precanvas = null),
            (this.nodeId = 1),
            (this.ele_selected = null),
            (this.node_selected = null),
            (this.drag = !1),
            (this.reroute = !1),
            (this.reroute_fix_curvature = !1),
            (this.curvature = 0.5),
            (this.reroute_curvature_start_end = 0.5),
            (this.reroute_curvature = 0.5),
            (this.reroute_width = 6),
            (this.drag_point = !1),
            (this.editor_selected = !1),
            (this.connection = !1),
            (this.connection_ele = null),
            (this.connection_selected = null),
            (this.canvas_x = 0),
            (this.canvas_y = 0),
            (this.pos_x = 0),
            (this.pos_x_start = 0),
            (this.pos_y = 0),
            (this.pos_y_start = 0),
            (this.mouse_x = 0),
            (this.mouse_y = 0),
            (this.line_path = 5),
            (this.first_click = null),
            (this.force_first_input = !1),
            (this.draggable_inputs = !0),
            (this.select_elements = null),
            (this.noderegister = {}),
            (this.render = t),
            (this.drawflow = {
              drawflow: {
                Home: {
                  data: {},
                },
              },
            }),
            (this.module = 'Home'),
            (this.editor_mode = 'edit'),
            (this.zoom = 1),
            (this.zoom_max = 1.6),
            (this.zoom_min = 0.5),
            (this.evCache = new Array()),
            (this.prevDiff = -1);
        }
        start() {
          this.container.classList.add('parent-drawflow'),
            (this.container.tabIndex = 0),
            (this.precanvas = document.createElement('div')),
            this.precanvas.classList.add('drawflow'),
            this.container.appendChild(this.precanvas),
            this.container.addEventListener('mouseup', this.dragEnd.bind(this)),
            this.container.addEventListener(
              'mousemove',
              this.position.bind(this)
            ),
            this.container.addEventListener('mousedown', this.click.bind(this)),
            this.container.addEventListener(
              'touchend',
              this.dragEnd.bind(this)
            ),
            this.container.addEventListener(
              'touchmove',
              this.position.bind(this)
            ),
            this.container.addEventListener(
              'touchstart',
              this.click.bind(this)
            ),
            this.container.addEventListener(
              'contextmenu',
              this.contextmenu.bind(this)
            ),
            this.container.addEventListener('keydown', this.key.bind(this)),
            this.container.addEventListener(
              'wheel',
              this.zoom_enter.bind(this)
            ),
            this.container.addEventListener(
              'input',
              this.updateNodeValue.bind(this)
            ),
            this.container.addEventListener(
              'dblclick',
              this.dblclick.bind(this)
            ),
            (this.container.onpointerdown = this.pointerdown_handler.bind(
              this
            )),
            (this.container.onpointermove = this.pointermove_handler.bind(
              this
            )),
            (this.container.onpointerup = this.pointerup_handler.bind(this)),
            (this.container.onpointercancel = this.pointerup_handler.bind(
              this
            )),
            (this.container.onpointerout = this.pointerup_handler.bind(this)),
            (this.container.onpointerleave = this.pointerup_handler.bind(this)),
            this.load();
        }
        pointerdown_handler(e) {
          this.evCache.push(e);
        }
        pointermove_handler(e) {
          for (var t = 0; t < this.evCache.length; t++)
            if (e.pointerId == this.evCache[t].pointerId) {
              this.evCache[t] = e;
              break;
            }

          if (2 == this.evCache.length) {
            var n = Math.abs(this.evCache[0].clientX - this.evCache[1].clientX);
            this.prevDiff > 100 &&
              (n > this.prevDiff && this.zoom_in(),
              n < this.prevDiff && this.zoom_out()),
              (this.prevDiff = n);
          }
        }
        pointerup_handler(e) {
          this.remove_event(e), this.evCache.length < 2 && (this.prevDiff = -1);
        }
        remove_event(e) {
          for (var t = 0; t < this.evCache.length; t++)
            if (this.evCache[t].pointerId == e.pointerId) {
              this.evCache.splice(t, 1);
              break;
            }
        }
        load() {
          for (var e in this.drawflow.drawflow[this.module].data)
            this.addNodeImport(
              this.drawflow.drawflow[this.module].data[e],
              this.precanvas
            );

          if (this.reroute)
            for (var e in this.drawflow.drawflow[this.module].data)
              this.addRerouteImport(
                this.drawflow.drawflow[this.module].data[e]
              );

          for (var e in this.drawflow.drawflow[this.module].data)
            this.updateConnectionNodes('node-' + e);

          const t = this.drawflow.drawflow;
          let n = 1;
          Object.keys(t).map(function (e, i) {
            Object.keys(t[e].data).map(function (e, t) {
              parseInt(e) >= n && (n = parseInt(e) + 1);
            });
          }),
            (this.nodeId = n);
        }
        removeReouteConnectionSelected() {
          this.reroute_fix_curvature &&
            this.connection_selected.parentElement
              .querySelectorAll('.main-path')
              .forEach((e, t) => {
                e.classList.remove('selected');
              });
        }
        click(e) {
          if ((this.dispatch('click', e), 'fixed' === this.editor_mode)) {
            if (
              'parent-drawflow' !== e.target.classList[0] &&
              'drawflow' !== e.target.classList[0]
            )
              return !1;

            this.ele_selected = e.target.closest('.parent-drawflow');
          } else
            (this.first_click = e.target),
              (this.ele_selected = e.target),
              0 === e.button && this.contextmenuDel(),
              null != e.target.closest('.drawflow_content_node') &&
                (this.ele_selected = e.target.closest(
                  '.drawflow_content_node'
                ).parentElement);

          switch (this.ele_selected.classList[0]) {
            case 'drawflow-node':
              null != this.node_selected &&
                (this.node_selected.classList.remove('selected'),
                this.node_selected != this.ele_selected &&
                  this.dispatch('nodeUnselected', !0)),
                null != this.connection_selected &&
                  (this.connection_selected.classList.remove('selected'),
                  this.removeReouteConnectionSelected(),
                  (this.connection_selected = null)),
                this.node_selected != this.ele_selected &&
                  this.dispatch('nodeSelected', this.ele_selected.id.slice(5)),
                (this.node_selected = this.ele_selected),
                this.node_selected.classList.add('selected'),
                (this.draggable_inputs ||
                  ('INPUT' !== e.target.tagName &&
                    'TEXTAREA' !== e.target.tagName &&
                    !0 !== e.target.hasAttribute('contenteditable'))) &&
                  (this.drag = !0);
              break;
            case 'output':
              (this.connection = !0),
                null != this.node_selected &&
                  (this.node_selected.classList.remove('selected'),
                  (this.node_selected = null),
                  this.dispatch('nodeUnselected', !0)),
                null != this.connection_selected &&
                  (this.connection_selected.classList.remove('selected'),
                  this.removeReouteConnectionSelected(),
                  (this.connection_selected = null)),
                this.drawConnection(e.target);
              break;
            case 'parent-drawflow':
            case 'drawflow':
              null != this.node_selected &&
                (this.node_selected.classList.remove('selected'),
                (this.node_selected = null),
                this.dispatch('nodeUnselected', !0)),
                null != this.connection_selected &&
                  (this.connection_selected.classList.remove('selected'),
                  this.removeReouteConnectionSelected(),
                  (this.connection_selected = null)),
                (this.editor_selected = !0);
              break;
            case 'main-path':
              null != this.node_selected &&
                (this.node_selected.classList.remove('selected'),
                (this.node_selected = null),
                this.dispatch('nodeUnselected', !0)),
                null != this.connection_selected &&
                  (this.connection_selected.classList.remove('selected'),
                  this.removeReouteConnectionSelected(),
                  (this.connection_selected = null)),
                (this.connection_selected = this.ele_selected),
                this.connection_selected.classList.add('selected'),
                this.reroute_fix_curvature &&
                  this.connection_selected.parentElement
                    .querySelectorAll('.main-path')
                    .forEach((e, t) => {
                      e.classList.add('selected');
                    });
              break;
            case 'point':
              (this.drag_point = !0),
                this.ele_selected.classList.add('selected');
              break;
            case 'drawflow-delete':
              this.node_selected && this.removeNodeId(this.node_selected.id),
                this.connection_selected && this.removeConnection(),
                null != this.node_selected &&
                  (this.node_selected.classList.remove('selected'),
                  (this.node_selected = null),
                  this.dispatch('nodeUnselected', !0)),
                null != this.connection_selected &&
                  (this.connection_selected.classList.remove('selected'),
                  this.removeReouteConnectionSelected(),
                  (this.connection_selected = null));
          }
          'touchstart' === e.type
            ? ((this.pos_x = e.touches[0].clientX),
              (this.pos_x_start = e.touches[0].clientX),
              (this.pos_y = e.touches[0].clientY),
              (this.pos_y_start = e.touches[0].clientY))
            : ((this.pos_x = e.clientX),
              (this.pos_x_start = e.clientX),
              (this.pos_y = e.clientY),
              (this.pos_y_start = e.clientY)),
            this.dispatch('clickEnd', e);
        }
        position(e) {
          if ('touchmove' === e.type)
            var t = e.touches[0].clientX,
              n = e.touches[0].clientY;
          else (t = e.clientX), (n = e.clientY);

          if (
            (this.connection && this.updateConnection(t, n),
            this.editor_selected &&
              ((i = this.canvas_x + -(this.pos_x - t)),
              (s = this.canvas_y + -(this.pos_y - n)),
              this.dispatch('translate', {
                x: i,
                y: s,
              }),
              (this.precanvas.style.transform =
                'translate(' +
                i +
                'px, ' +
                s +
                'px) scale(' +
                this.zoom +
                ')')),
            this.drag)
          ) {
            var i =
                ((this.pos_x - t) * this.precanvas.clientWidth) /
                (this.precanvas.clientWidth * this.zoom),
              s =
                ((this.pos_y - n) * this.precanvas.clientHeight) /
                (this.precanvas.clientHeight * this.zoom);
            (this.pos_x = t),
              (this.pos_y = n),
              (this.ele_selected.style.top =
                this.ele_selected.offsetTop - s + 'px'),
              (this.ele_selected.style.left =
                this.ele_selected.offsetLeft - i + 'px'),
              (this.drawflow.drawflow[this.module].data[
                this.ele_selected.id.slice(5)
              ].pos_x = this.ele_selected.offsetLeft - i),
              (this.drawflow.drawflow[this.module].data[
                this.ele_selected.id.slice(5)
              ].pos_y = this.ele_selected.offsetTop - s),
              this.updateConnectionNodes(this.ele_selected.id);
          }
          if (this.drag_point) {
            (i =
              ((this.pos_x - t) * this.precanvas.clientWidth) /
              (this.precanvas.clientWidth * this.zoom)),
              (s =
                ((this.pos_y - n) * this.precanvas.clientHeight) /
                (this.precanvas.clientHeight * this.zoom));
            (this.pos_x = t), (this.pos_y = n);
            var o =
                this.pos_x *
                  (this.precanvas.clientWidth /
                    (this.precanvas.clientWidth * this.zoom)) -
                this.precanvas.getBoundingClientRect().x *
                  (this.precanvas.clientWidth /
                    (this.precanvas.clientWidth * this.zoom)),
              l =
                this.pos_y *
                  (this.precanvas.clientHeight /
                    (this.precanvas.clientHeight * this.zoom)) -
                this.precanvas.getBoundingClientRect().y *
                  (this.precanvas.clientHeight /
                    (this.precanvas.clientHeight * this.zoom));
            this.ele_selected.setAttributeNS(null, 'cx', o),
              this.ele_selected.setAttributeNS(null, 'cy', l);
            const e = this.ele_selected.parentElement.classList[2].slice(9),
              d = this.ele_selected.parentElement.classList[1].slice(13),
              c = this.ele_selected.parentElement.classList[3],
              a = this.ele_selected.parentElement.classList[4];
            let r =
              Array.from(this.ele_selected.parentElement.children).indexOf(
                this.ele_selected
              ) - 1;
            if (this.reroute_fix_curvature) {
              (r -=
                this.ele_selected.parentElement.querySelectorAll('.main-path')
                  .length - 1),
                r < 0 && (r = 0);
            }
            const h = e.slice(5),
              u = this.drawflow.drawflow[this.module].data[h].outputs[
                c
              ].connections.findIndex(function (e, t) {
                return e.node === d && e.output === a;
              });
            this.drawflow.drawflow[this.module].data[h].outputs[c].connections[
              u
            ].points[r] = {
              pos_x: o,
              pos_y: l,
            };
            const p = this.ele_selected.parentElement.classList[2].slice(9);
            this.updateConnectionNodes(p);
          }
          'touchmove' === e.type && ((this.mouse_x = t), (this.mouse_y = n)),
            this.dispatch('mouseMove', {
              x: t,
              y: n,
            });
        }
        dragEnd(e) {
          if (
            (null != this.select_elements &&
              (this.select_elements.remove(), (this.select_elements = null)),
            'touchend' === e.type)
          )
            var t = this.mouse_x,
              n = this.mouse_y,
              i = document.elementFromPoint(t, n);
          else (t = e.clientX), (n = e.clientY), (i = e.target);

          if (
            (this.drag &&
              ((this.pos_x_start == t && this.pos_y_start == n) ||
                this.dispatch('nodeMoved', this.ele_selected.id.slice(5))),
            this.drag_point && this.ele_selected.classList.remove('selected'),
            this.editor_selected &&
              ((this.canvas_x = this.canvas_x + -(this.pos_x - t)),
              (this.canvas_y = this.canvas_y + -(this.pos_y - n)),
              (this.editor_selected = !1)),
            !0 === this.connection)
          )
            if (
              'input' === i.classList[0] ||
              (this.force_first_input &&
                (null != i.closest('.drawflow_content_node') ||
                  'drawflow-node' === i.classList[0]))
            ) {
              if (
                !this.force_first_input ||
                (null == i.closest('.drawflow_content_node') &&
                  'drawflow-node' !== i.classList[0])
              )
                (s = i.parentElement.parentElement.id), (o = i.classList[1]);
              else {
                if (null != i.closest('.drawflow_content_node'))
                  var s = i.closest('.drawflow_content_node').parentElement.id;
                else var s = i.id;

                var o = 'input_1';
              }
              var l = this.ele_selected.parentElement.parentElement.id,
                d = this.ele_selected.classList[1];
              if (l !== s) {
                if (
                  0 ===
                  this.container.querySelectorAll(
                    '.connection.node_in_' +
                      s +
                      '.node_out_' +
                      l +
                      '.' +
                      d +
                      '.' +
                      o
                  ).length
                ) {
                  this.connection_ele.classList.add('node_in_' + s),
                    this.connection_ele.classList.add('node_out_' + l),
                    this.connection_ele.classList.add(d),
                    this.connection_ele.classList.add(o);
                  var c = s.slice(5),
                    a = l.slice(5);
                  this.drawflow.drawflow[this.module].data[a].outputs[
                    d
                  ].connections.push({ node: c, output: o }),
                    this.drawflow.drawflow[this.module].data[c].inputs[
                      o
                    ].connections.push({ node: a, input: d }),
                    this.updateConnectionNodes('node-' + a),
                    this.updateConnectionNodes('node-' + c),
                    this.dispatch('connectionCreated', {
                      output_id: a,
                      input_id: c,
                      output_class: d,
                      input_class: o,
                    });
                } else this.connection_ele.remove();

                this.connection_ele = null;
              } else this.connection_ele.remove(), (this.connection_ele = null);
            } else this.connection_ele.remove(), (this.connection_ele = null);

          (this.drag = !1),
            (this.drag_point = !1),
            (this.connection = !1),
            (this.ele_selected = null),
            (this.editor_selected = !1);
        }
        contextmenu(e) {
          if (
            (this.dispatch('contextmenu', e),
            e.preventDefault(),
            'fixed' === this.editor_mode)
          )
            return !1;

          if (
            (this.precanvas.getElementsByClassName('drawflow-delete').length &&
              this.precanvas
                .getElementsByClassName('drawflow-delete')[0]
                .remove(),
            this.node_selected || this.connection_selected)
          ) {
            var t = document.createElement('div');
            t.classList.add('drawflow-delete'),
              (t.innerHTML = 'x'),
              this.node_selected && this.node_selected.appendChild(t),
              this.connection_selected &&
                ((t.style.top =
                  e.clientY *
                    (this.precanvas.clientHeight /
                      (this.precanvas.clientHeight * this.zoom)) -
                  this.precanvas.getBoundingClientRect().y *
                    (this.precanvas.clientHeight /
                      (this.precanvas.clientHeight * this.zoom)) +
                  'px'),
                (t.style.left =
                  e.clientX *
                    (this.precanvas.clientWidth /
                      (this.precanvas.clientWidth * this.zoom)) -
                  this.precanvas.getBoundingClientRect().x *
                    (this.precanvas.clientWidth /
                      (this.precanvas.clientWidth * this.zoom)) +
                  'px'),
                this.precanvas.appendChild(t));
          }
        }
        contextmenuDel() {
          this.precanvas.getElementsByClassName('drawflow-delete').length &&
            this.precanvas
              .getElementsByClassName('drawflow-delete')[0]
              .remove();
        }
        key(e) {
          if ((this.dispatch('keydown', e), 'fixed' === this.editor_mode))
            return !1;

          ('Delete' === e.key || ('Backspace' === e.key && e.metaKey)) &&
            (null != this.node_selected &&
              'INPUT' !== this.first_click.tagName &&
              'TEXTAREA' !== this.first_click.tagName &&
              !0 !== this.first_click.hasAttribute('contenteditable') &&
              this.removeNodeId(this.node_selected.id),
            null != this.connection_selected && this.removeConnection());
        }
        zoom_enter(e, t) {
          e.ctrlKey &&
            (e.preventDefault(),
            e.deltaY > 0 ? this.zoom_out() : this.zoom_in());
        }
        zoom_refresh() {
          this.dispatch('zoom', this.zoom),
            (this.precanvas.style.transform =
              'translate(' +
              this.canvas_x +
              'px, ' +
              this.canvas_y +
              'px) scale(' +
              this.zoom +
              ')');
        }
        zoom_in() {
          this.zoom < this.zoom_max &&
            ((this.zoom += 0.1), this.zoom_refresh());
        }
        zoom_out() {
          this.zoom > this.zoom_min &&
            ((this.zoom -= 0.1), this.zoom_refresh());
        }
        zoom_reset() {
          1 != this.zoom && ((this.zoom = 1), this.zoom_refresh());
        }
        createCurvature(e, t, n, i, s, o) {
          var l = e,
            d = t,
            c = n,
            a = i,
            r = s;
          switch (o) {
            case 'open':
              if (e >= n)
                var h = l + Math.abs(c - l) * r,
                  u = c - Math.abs(c - l) * (-1 * r);
              else (h = l + Math.abs(c - l) * r), (u = c - Math.abs(c - l) * r);

              return (
                ' M ' +
                l +
                ' ' +
                d +
                ' C ' +
                h +
                ' ' +
                d +
                ' ' +
                u +
                ' ' +
                a +
                ' ' +
                c +
                '  ' +
                a
              );
            case 'close':
              if (e >= n)
                (h = l + Math.abs(c - l) * (-1 * r)),
                  (u = c - Math.abs(c - l) * r);
              else (h = l + Math.abs(c - l) * r), (u = c - Math.abs(c - l) * r);

              return (
                ' M ' +
                l +
                ' ' +
                d +
                ' C ' +
                h +
                ' ' +
                d +
                ' ' +
                u +
                ' ' +
                a +
                ' ' +
                c +
                '  ' +
                a
              );
            case 'other':
              if (e >= n)
                (h = l + Math.abs(c - l) * (-1 * r)),
                  (u = c - Math.abs(c - l) * (-1 * r));
              else (h = l + Math.abs(c - l) * r), (u = c - Math.abs(c - l) * r);

              return (
                ' M ' +
                l +
                ' ' +
                d +
                ' C ' +
                h +
                ' ' +
                d +
                ' ' +
                u +
                ' ' +
                a +
                ' ' +
                c +
                '  ' +
                a
              );
            default:
              return (
                ' M ' +
                l +
                ' ' +
                d +
                ' C ' +
                (h = l + Math.abs(c - l) * r) +
                ' ' +
                d +
                ' ' +
                (u = c - Math.abs(c - l) * r) +
                ' ' +
                a +
                ' ' +
                c +
                '  ' +
                a
              );
          }
        }
        drawConnection(e) {
          var t = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          this.connection_ele = t;
          var n = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
          );
          n.classList.add('main-path'),
            n.setAttributeNS(null, 'd', ''),
            t.classList.add('connection'),
            t.appendChild(n),
            this.precanvas.appendChild(t);
        }
        updateConnection(e, t) {
          const n = this.precanvas,
            i = this.zoom;
          let s = n.clientWidth / (n.clientWidth * i);
          s = s || 0;
          let o = n.clientHeight / (n.clientHeight * i);
          o = o || 0;
          var l = this.connection_ele.children[0],
            d =
              this.ele_selected.offsetWidth / 2 +
              (this.ele_selected.getBoundingClientRect().x -
                n.getBoundingClientRect().x) *
                s,
            c =
              this.ele_selected.offsetHeight / 2 +
              (this.ele_selected.getBoundingClientRect().y -
                n.getBoundingClientRect().y) *
                o,
            a =
              e *
                (this.precanvas.clientWidth /
                  (this.precanvas.clientWidth * this.zoom)) -
              this.precanvas.getBoundingClientRect().x *
                (this.precanvas.clientWidth /
                  (this.precanvas.clientWidth * this.zoom)),
            r =
              t *
                (this.precanvas.clientHeight /
                  (this.precanvas.clientHeight * this.zoom)) -
              this.precanvas.getBoundingClientRect().y *
                (this.precanvas.clientHeight /
                  (this.precanvas.clientHeight * this.zoom)),
            h = this.curvature,
            u = this.createCurvature(d, c, a, r, h, 'openclose');
          l.setAttributeNS(null, 'd', u);
        }
        addConnection(e, t, n, i) {
          var s = this.getModuleFromNodeId(e);
          if (s === this.getModuleFromNodeId(t)) {
            var o = this.getNodeFromId(e),
              l = !1;
            for (var d in o.outputs[n].connections) {
              var c = o.outputs[n].connections[d];
              c.node == t && c.output == i && (l = !0);
            }
            if (!1 === l) {
              if (
                (this.drawflow.drawflow[s].data[e].outputs[n].connections.push({
                  node: t.toString(),
                  output: i,
                }),
                this.drawflow.drawflow[s].data[t].inputs[i].connections.push({
                  node: e.toString(),
                  input: n,
                }),
                this.module === s)
              ) {
                var a = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'svg'
                  ),
                  r = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'path'
                  );
                r.classList.add('main-path'),
                  r.setAttributeNS(null, 'd', ''),
                  a.classList.add('connection'),
                  a.classList.add('node_in_node-' + t),
                  a.classList.add('node_out_node-' + e),
                  a.classList.add(n),
                  a.classList.add(i),
                  a.appendChild(r),
                  this.precanvas.appendChild(a),
                  this.updateConnectionNodes('node-' + e),
                  this.updateConnectionNodes('node-' + t);
              }
              this.dispatch('connectionCreated', {
                output_id: e,
                input_id: t,
                output_class: n,
                input_class: i,
              });
            }
          }
        }
        updateConnectionNodes(e) {
          const t = 'node_in_' + e,
            n = 'node_out_' + e;
          this.line_path;
          const i = this.precanvas,
            s = this.curvature,
            o = this.createCurvature,
            l = this.reroute_curvature,
            d = this.reroute_curvature_start_end,
            c = this.reroute_fix_curvature,
            a = this.reroute_width,
            r = this.zoom;
          let h = i.clientWidth / (i.clientWidth * r);
          h = h || 0;
          let u = i.clientHeight / (i.clientHeight * r);
          u = u || 0;
          const p = document.getElementsByClassName(n);
          Object.keys(p).map(function (t, n) {
            if (null === p[t].querySelector('.point')) {
              var f = document.getElementById(e),
                m = p[t].classList[1].replace('node_in_', ''),
                g = document
                  .getElementById(m)
                  .querySelectorAll('.' + p[t].classList[4])[0],
                _ =
                  g.offsetWidth / 2 +
                  (g.getBoundingClientRect().x - i.getBoundingClientRect().x) *
                    h,
                w =
                  g.offsetHeight / 2 +
                  (g.getBoundingClientRect().y - i.getBoundingClientRect().y) *
                    u,
                v = f.querySelectorAll('.' + p[t].classList[3])[0],
                y =
                  v.offsetWidth / 2 +
                  (v.getBoundingClientRect().x - i.getBoundingClientRect().x) *
                    h,
                C =
                  v.offsetHeight / 2 +
                  (v.getBoundingClientRect().y - i.getBoundingClientRect().y) *
                    u;
              const n = o(y, C, _, w, s, 'openclose');
              p[t].children[0].setAttributeNS(null, 'd', n);
            } else {
              const n = p[t].querySelectorAll('.point');
              let s = '';
              const f = [];
              n.forEach((t, c) => {
                if (0 === c && n.length - 1 == 0) {
                  var p = document.getElementById(e),
                    m =
                      ((C = t).getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a,
                    g =
                      (C.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a,
                    _ =
                      (x = p.querySelectorAll(
                        '.' + t.parentElement.classList[3]
                      )[0]).offsetWidth /
                        2 +
                      (x.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h,
                    w =
                      x.offsetHeight / 2 +
                      (x.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u,
                    v = o(_, w, m, g, d, 'open');
                  (s += v), f.push(v);
                  p = t;
                  var y = t.parentElement.classList[1].replace('node_in_', ''),
                    C = (L = document.getElementById(y)).querySelectorAll(
                      '.' + t.parentElement.classList[4]
                    )[0];
                  (m =
                    (E = L.querySelectorAll(
                      '.' + t.parentElement.classList[4]
                    )[0]).offsetWidth /
                      2 +
                    (E.getBoundingClientRect().x -
                      i.getBoundingClientRect().x) *
                      h),
                    (g =
                      E.offsetHeight / 2 +
                      (E.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u),
                    (_ =
                      (p.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (w =
                      (p.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (v = o(_, w, m, g, d, 'close'));
                  (s += v), f.push(v);
                } else if (0 === c) {
                  var x;
                  (p = document.getElementById(e)),
                    (m =
                      ((C = t).getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (g =
                      (C.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (_ =
                      (x = p.querySelectorAll(
                        '.' + t.parentElement.classList[3]
                      )[0]).offsetWidth /
                        2 +
                      (x.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h),
                    (w =
                      x.offsetHeight / 2 +
                      (x.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u),
                    (v = o(_, w, m, g, d, 'open'));
                  (s += v), f.push(v);
                  (p = t),
                    (m =
                      ((C = n[c + 1]).getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (g =
                      (C.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (_ =
                      (p.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (w =
                      (p.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (v = o(_, w, m, g, l, 'other'));
                  (s += v), f.push(v);
                } else if (c === n.length - 1) {
                  var L, E;
                  (p = t),
                    (y = t.parentElement.classList[1].replace('node_in_', '')),
                    (C = (L = document.getElementById(y)).querySelectorAll(
                      '.' + t.parentElement.classList[4]
                    )[0]),
                    (m =
                      (E = L.querySelectorAll(
                        '.' + t.parentElement.classList[4]
                      )[0]).offsetWidth /
                        2 +
                      (E.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h),
                    (g =
                      E.offsetHeight / 2 +
                      (E.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u),
                    (_ =
                      (p.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        (i.clientWidth / (i.clientWidth * r)) +
                      a),
                    (w =
                      (p.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        (i.clientHeight / (i.clientHeight * r)) +
                      a),
                    (v = o(_, w, m, g, d, 'close'));
                  (s += v), f.push(v);
                } else {
                  (p = t),
                    (m =
                      ((C = n[c + 1]).getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        (i.clientWidth / (i.clientWidth * r)) +
                      a),
                    (g =
                      (C.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        (i.clientHeight / (i.clientHeight * r)) +
                      a),
                    (_ =
                      (p.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        (i.clientWidth / (i.clientWidth * r)) +
                      a),
                    (w =
                      (p.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        (i.clientHeight / (i.clientHeight * r)) +
                      a),
                    (v = o(_, w, m, g, l, 'other'));
                  (s += v), f.push(v);
                }
              }),
                c
                  ? f.forEach((e, n) => {
                      p[t].children[n].setAttributeNS(null, 'd', e);
                    })
                  : p[t].children[0].setAttributeNS(null, 'd', s);
            }
          });
          const f = document.getElementsByClassName(t);
          Object.keys(f).map(function (t, n) {
            if (null === f[t].querySelector('.point')) {
              var r = document.getElementById(e),
                p = f[t].classList[2].replace('node_out_', ''),
                m = document
                  .getElementById(p)
                  .querySelectorAll('.' + f[t].classList[3])[0],
                g =
                  m.offsetWidth / 2 +
                  (m.getBoundingClientRect().x - i.getBoundingClientRect().x) *
                    h,
                _ =
                  m.offsetHeight / 2 +
                  (m.getBoundingClientRect().y - i.getBoundingClientRect().y) *
                    u,
                w =
                  (r = r.querySelectorAll('.' + f[t].classList[4])[0])
                    .offsetWidth /
                    2 +
                  (r.getBoundingClientRect().x - i.getBoundingClientRect().x) *
                    h,
                v =
                  r.offsetHeight / 2 +
                  (r.getBoundingClientRect().y - i.getBoundingClientRect().y) *
                    u;
              const n = o(g, _, w, v, s, 'openclose');
              f[t].children[0].setAttributeNS(null, 'd', n);
            } else {
              const n = f[t].querySelectorAll('.point');
              let s = '';
              const r = [];
              n.forEach((t, c) => {
                if (0 === c && n.length - 1 == 0) {
                  var p = document.getElementById(e),
                    f =
                      ((y = t).getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a,
                    m =
                      (y.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a,
                    g =
                      (L = p.querySelectorAll(
                        '.' + t.parentElement.classList[4]
                      )[0]).offsetWidth /
                        2 +
                      (L.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h,
                    _ =
                      L.offsetHeight / 2 +
                      (L.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u,
                    w = o(f, m, g, _, d, 'close');
                  (s += w), r.push(w);
                  p = t;
                  var v = t.parentElement.classList[2].replace('node_out_', ''),
                    y = (x = document.getElementById(v)).querySelectorAll(
                      '.' + t.parentElement.classList[3]
                    )[0];
                  (f =
                    (C = x.querySelectorAll(
                      '.' + t.parentElement.classList[3]
                    )[0]).offsetWidth /
                      2 +
                    (C.getBoundingClientRect().x -
                      i.getBoundingClientRect().x) *
                      h),
                    (m =
                      C.offsetHeight / 2 +
                      (C.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u),
                    (g =
                      (p.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (_ =
                      (p.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (w = o(f, m, g, _, d, 'open'));
                  (s += w), r.push(w);
                } else if (0 === c) {
                  var C;
                  (p = t),
                    (v = t.parentElement.classList[2].replace('node_out_', '')),
                    (y = (x = document.getElementById(v)).querySelectorAll(
                      '.' + t.parentElement.classList[3]
                    )[0]),
                    (f =
                      (C = x.querySelectorAll(
                        '.' + t.parentElement.classList[3]
                      )[0]).offsetWidth /
                        2 +
                      (C.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h),
                    (m =
                      C.offsetHeight / 2 +
                      (C.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u),
                    (g =
                      (p.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (_ =
                      (p.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (w = o(f, m, g, _, d, 'open'));
                  (s += w), r.push(w);
                  (p = t),
                    (g =
                      ((y = n[c + 1]).getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (_ =
                      (y.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (f =
                      (p.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (m =
                      (p.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (w = o(f, m, g, _, l, 'other'));
                  (s += w), r.push(w);
                } else if (c === n.length - 1) {
                  var x, L;
                  (p = t),
                    (v = t.parentElement.classList[1].replace('node_in_', '')),
                    (y = (x = document.getElementById(v)).querySelectorAll(
                      '.' + t.parentElement.classList[4]
                    )[0]),
                    (g =
                      (L = x.querySelectorAll(
                        '.' + t.parentElement.classList[4]
                      )[0]).offsetWidth /
                        2 +
                      (L.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h),
                    (_ =
                      L.offsetHeight / 2 +
                      (L.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u),
                    (f =
                      (p.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (m =
                      (p.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (w = o(f, m, g, _, d, 'close'));
                  (s += w), r.push(w);
                } else {
                  (p = t),
                    (g =
                      ((y = n[c + 1]).getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (_ =
                      (y.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (f =
                      (p.getBoundingClientRect().x -
                        i.getBoundingClientRect().x) *
                        h +
                      a),
                    (m =
                      (p.getBoundingClientRect().y -
                        i.getBoundingClientRect().y) *
                        u +
                      a),
                    (w = o(f, m, g, _, l, 'other'));
                  (s += w), r.push(w);
                }
              }),
                c
                  ? r.forEach((e, n) => {
                      f[t].children[n].setAttributeNS(null, 'd', e);
                    })
                  : f[t].children[0].setAttributeNS(null, 'd', s);
            }
          });
        }
        dblclick(e) {
          null != this.connection_selected &&
            this.reroute &&
            this.createReroutePoint(this.connection_selected),
            'point' === e.target.classList[0] &&
              this.removeReroutePoint(e.target);
        }
        createReroutePoint(e) {
          this.connection_selected.classList.remove('selected');
          const t = this.connection_selected.parentElement.classList[2].slice(
              9
            ),
            n = this.connection_selected.parentElement.classList[1].slice(13),
            i = this.connection_selected.parentElement.classList[3],
            s = this.connection_selected.parentElement.classList[4];
          this.connection_selected = null;
          const o = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'circle'
          );
          o.classList.add('point');
          var l =
              this.pos_x *
                (this.precanvas.clientWidth /
                  (this.precanvas.clientWidth * this.zoom)) -
              this.precanvas.getBoundingClientRect().x *
                (this.precanvas.clientWidth /
                  (this.precanvas.clientWidth * this.zoom)),
            d =
              this.pos_y *
                (this.precanvas.clientHeight /
                  (this.precanvas.clientHeight * this.zoom)) -
              this.precanvas.getBoundingClientRect().y *
                (this.precanvas.clientHeight /
                  (this.precanvas.clientHeight * this.zoom));
          o.setAttributeNS(null, 'cx', l),
            o.setAttributeNS(null, 'cy', d),
            o.setAttributeNS(null, 'r', this.reroute_width);
          let c = 0;
          if (this.reroute_fix_curvature) {
            const t = e.parentElement.querySelectorAll('.main-path').length;
            var a = document.createElementNS(
              'http://www.w3.org/2000/svg',
              'path'
            );
            if (
              (a.classList.add('main-path'),
              a.setAttributeNS(null, 'd', ''),
              e.parentElement.insertBefore(a, e.parentElement.children[t]),
              1 === t)
            )
              e.parentElement.appendChild(o);
            else {
              const n = Array.from(e.parentElement.children).indexOf(e);
              (c = n),
                e.parentElement.insertBefore(
                  o,
                  e.parentElement.children[n + t + 1]
                );
            }
          } else e.parentElement.appendChild(o);

          const r = t.slice(5),
            h = this.drawflow.drawflow[this.module].data[r].outputs[
              i
            ].connections.findIndex(function (e, t) {
              return e.node === n && e.output === s;
            });
          void 0 ===
            this.drawflow.drawflow[this.module].data[r].outputs[i].connections[
              h
            ].points &&
            (this.drawflow.drawflow[this.module].data[r].outputs[i].connections[
              h
            ].points = []),
            this.reroute_fix_curvature
              ? (c > 0
                  ? this.drawflow.drawflow[this.module].data[r].outputs[
                      i
                    ].connections[h].points.splice(c, 0, {
                      pos_x: l,
                      pos_y: d,
                    })
                  : this.drawflow.drawflow[this.module].data[r].outputs[
                      i
                    ].connections[h].points.push({ pos_x: l, pos_y: d }),
                e.parentElement
                  .querySelectorAll('.main-path')
                  .forEach((e, t) => {
                    e.classList.remove('selected');
                  }))
              : this.drawflow.drawflow[this.module].data[r].outputs[
                  i
                ].connections[h].points.push({ pos_x: l, pos_y: d }),
            this.dispatch('addReroute', r),
            this.updateConnectionNodes(t);
        }
        removeReroutePoint(e) {
          const t = e.parentElement.classList[2].slice(9),
            n = e.parentElement.classList[1].slice(13),
            i = e.parentElement.classList[3],
            s = e.parentElement.classList[4];
          let o = Array.from(e.parentElement.children).indexOf(e) - 1;
          const l = t.slice(5),
            d = this.drawflow.drawflow[this.module].data[l].outputs[
              i
            ].connections.findIndex(function (e, t) {
              return e.node === n && e.output === s;
            });
          if (this.reroute_fix_curvature) {
            const t = e.parentElement.querySelectorAll('.main-path').length;
            e.parentElement.children[t - 1].remove(),
              (o -= t),
              o < 0 && (o = 0);
          }
          this.drawflow.drawflow[this.module].data[l].outputs[i].connections[
            d
          ].points.splice(o, 1),
            e.remove(),
            this.dispatch('removeReroute', l),
            this.updateConnectionNodes(t);
        }
        registerNode(e, t, n = null, i = null) {
          this.noderegister[e] = {
            html: t,
            props: n,
            options: i,
          };
        }
        getNodeFromId(e) {
          var t = this.getModuleFromNodeId(e);
          return JSON.parse(JSON.stringify(this.drawflow.drawflow[t].data[e]));
        }
        getNodesFromName(e) {
          var t = [];
          const n = this.drawflow.drawflow;
          return (
            Object.keys(n).map(function (i, s) {
              for (var o in n[i].data)
                n[i].data[o].name == e && t.push(n[i].data[o].id);
            }),
            t
          );
        }
        addNode(e, t, n, i, s, o, l, d, c = !1) {
          const a = document.createElement('div');
          a.classList.add('parent-node');
          const r = document.createElement('div');
          (r.innerHTML = ''),
            r.setAttribute('id', 'node-' + this.nodeId),
            r.classList.add('drawflow-node'),
            '' != o && r.classList.add(o);
          const h = document.createElement('div');
          h.classList.add('inputs');
          const u = document.createElement('div');
          u.classList.add('outputs');
          const p = {};
          for (var f = 0; f < t; f++) {
            const e = document.createElement('div');
            e.classList.add('input'),
              e.classList.add('input_' + (f + 1)),
              (p['input_' + (f + 1)] = {
                connections: [],
              }),
              h.appendChild(e);
          }
          const m = {};
          for (f = 0; f < n; f++) {
            const e = document.createElement('div');
            e.classList.add('output'),
              e.classList.add('output_' + (f + 1)),
              (m['output_' + (f + 1)] = {
                connections: [],
              }),
              u.appendChild(e);
          }
          const g = document.createElement('div');
          if ((g.classList.add('drawflow_content_node'), !1 === c))
            g.innerHTML = d;
          else if (!0 === c)
            g.appendChild(this.noderegister[d].html.cloneNode(!0));
          else {
            let e = new this.render({
              render: (e) =>
                e(this.noderegister[d].html, {
                  props: this.noderegister[d].props,
                }),
              ...this.noderegister[d].options,
            }).$mount();
            g.appendChild(e.$el);
          }
          Object.entries(l).forEach(function (e, t) {
            if ('object' == typeof e[1])
              !(function e(t, n, i) {
                if (null === t) t = l[n];
                else t = t[n];

                Object.entries(t).forEach(function (s, o) {
                  if ('object' == typeof s[1]) e(t, s[0], n + '-' + s[0]);
                  else
                    for (
                      var l = g.querySelectorAll('[df-' + i + '-' + s[0] + ']'),
                        d = 0;
                      d < l.length;
                      d++
                    )
                      l[d].value = s[1];
                });
              })(null, e[0], e[0]);
            else
              for (
                var n = g.querySelectorAll('[df-' + e[0] + ']'), i = 0;
                i < n.length;
                i++
              )
                n[i].value = e[1];
          }),
            r.appendChild(h),
            r.appendChild(g),
            r.appendChild(u),
            (r.style.top = s + 'px'),
            (r.style.left = i + 'px'),
            a.appendChild(r),
            this.precanvas.appendChild(a);
          var _ = {
            id: this.nodeId,
            name: e,
            data: l,
            class: o,
            html: d,
            typenode: c,
            inputs: p,
            outputs: m,
            pos_x: i,
            pos_y: s,
          };
          (this.drawflow.drawflow[this.module].data[this.nodeId] = _),
            this.dispatch('nodeCreated', this.nodeId);
          var w = this.nodeId;
          return this.nodeId++, w;
        }
        addNodeImport(e, t) {
          const n = document.createElement('div');
          n.classList.add('parent-node');
          const i = document.createElement('div');
          (i.innerHTML = ''),
            i.setAttribute('id', 'node-' + e.id),
            i.classList.add('drawflow-node'),
            '' != e.class && i.classList.add(e.class);
          const s = document.createElement('div');
          s.classList.add('inputs');
          const o = document.createElement('div');
          o.classList.add('outputs'),
            Object.keys(e.inputs).map(function (n, i) {
              const o = document.createElement('div');
              o.classList.add('input'),
                o.classList.add(n),
                s.appendChild(o),
                Object.keys(e.inputs[n].connections).map(function (i, s) {
                  var o = document.createElementNS(
                      'http://www.w3.org/2000/svg',
                      'svg'
                    ),
                    l = document.createElementNS(
                      'http://www.w3.org/2000/svg',
                      'path'
                    );
                  l.classList.add('main-path'),
                    l.setAttributeNS(null, 'd', ''),
                    o.classList.add('connection'),
                    o.classList.add('node_in_node-' + e.id),
                    o.classList.add(
                      'node_out_node-' + e.inputs[n].connections[i].node
                    ),
                    o.classList.add(e.inputs[n].connections[i].input),
                    o.classList.add(n),
                    o.appendChild(l),
                    t.appendChild(o);
                });
            });
          for (var l = 0; l < Object.keys(e.outputs).length; l++) {
            const e = document.createElement('div');
            e.classList.add('output'),
              e.classList.add('output_' + (l + 1)),
              o.appendChild(e);
          }
          const d = document.createElement('div');
          if ((d.classList.add('drawflow_content_node'), !1 === e.typenode))
            d.innerHTML = e.html;
          else if (!0 === e.typenode)
            d.appendChild(this.noderegister[e.html].html.cloneNode(!0));
          else {
            let t = new this.render({
              render: (t) =>
                t(this.noderegister[e.html].html, {
                  props: this.noderegister[e.html].props,
                }),
              ...this.noderegister[e.html].options,
            }).$mount();
            d.appendChild(t.$el);
          }
          Object.entries(e.data).forEach(function (t, n) {
            if ('object' == typeof t[1])
              !(function t(n, i, s) {
                if (null === n) n = e.data[i];
                else n = n[i];

                Object.entries(n).forEach(function (e, o) {
                  if ('object' == typeof e[1]) t(n, e[0], i + '-' + e[0]);
                  else
                    for (
                      var l = d.querySelectorAll('[df-' + s + '-' + e[0] + ']'),
                        c = 0;
                      c < l.length;
                      c++
                    )
                      l[c].value = e[1];
                });
              })(null, t[0], t[0]);
            else
              for (
                var i = d.querySelectorAll('[df-' + t[0] + ']'), s = 0;
                s < i.length;
                s++
              )
                i[s].value = t[1];
          }),
            i.appendChild(s),
            i.appendChild(d),
            i.appendChild(o),
            (i.style.top = e.pos_y + 'px'),
            (i.style.left = e.pos_x + 'px'),
            n.appendChild(i),
            this.precanvas.appendChild(n);
        }
        addRerouteImport(e) {
          const t = this.reroute_width,
            n = this.reroute_fix_curvature;
          Object.keys(e.outputs).map(function (i, s) {
            Object.keys(e.outputs[i].connections).map(function (s, o) {
              const l = e.outputs[i].connections[s].points;
              void 0 !== l &&
                l.forEach((o, d) => {
                  const c = e.outputs[i].connections[s].node,
                    a = e.outputs[i].connections[s].output,
                    r = document.querySelector(
                      '.connection.node_in_node-' +
                        c +
                        '.node_out_node-' +
                        e.id +
                        '.' +
                        i +
                        '.' +
                        a
                    );
                  if (n && 0 === d)
                    for (var h = 0; h < l.length; h++) {
                      var u = document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'path'
                      );
                      u.classList.add('main-path'),
                        u.setAttributeNS(null, 'd', ''),
                        r.appendChild(u);
                    }

                  const p = document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    'circle'
                  );
                  p.classList.add('point');
                  var f = o.pos_x,
                    m = o.pos_y;
                  p.setAttributeNS(null, 'cx', f),
                    p.setAttributeNS(null, 'cy', m),
                    p.setAttributeNS(null, 'r', t),
                    r.appendChild(p);
                });
            });
          });
        }
        updateNodeValue(e) {
          for (var t = e.target.attributes, n = 0; n < t.length; n++)
            t[n].nodeName.startsWith('df-') &&
              (this.drawflow.drawflow[this.module].data[
                e.target
                  .closest('.drawflow_content_node')
                  .parentElement.id.slice(5)
              ].data[t[n].nodeName.slice(3)] = e.target.value);
        }
        addNodeInput(e) {
          var t = this.getModuleFromNodeId(e);
          const n = this.getNodeFromId(e),
            i = Object.keys(n.inputs).length;
          if (this.module === t) {
            const t = document.createElement('div');
            t.classList.add('input'),
              t.classList.add('input_' + (i + 1)),
              document.querySelector('#node-' + e + ' .inputs').appendChild(t),
              this.updateConnectionNodes('node-' + e);
          }
          this.drawflow.drawflow[t].data[e].inputs['input_' + (i + 1)] = {
            connections: [],
          };
        }
        addNodeOutput(e) {
          var t = this.getModuleFromNodeId(e);
          const n = this.getNodeFromId(e),
            i = Object.keys(n.outputs).length;
          if (this.module === t) {
            const t = document.createElement('div');
            t.classList.add('output'),
              t.classList.add('output_' + (i + 1)),
              document.querySelector('#node-' + e + ' .outputs').appendChild(t),
              this.updateConnectionNodes('node-' + e);
          }
          this.drawflow.drawflow[t].data[e].outputs['output_' + (i + 1)] = {
            connections: [],
          };
        }
        removeNodeInput(e, t) {
          var n = this.getModuleFromNodeId(e);
          const i = this.getNodeFromId(e);
          this.module === n &&
            document
              .querySelector('#node-' + e + ' .inputs .input.' + t)
              .remove();
          const s = [];
          Object.keys(i.inputs[t].connections).map(function (n, o) {
            const l = i.inputs[t].connections[o].node,
              d = i.inputs[t].connections[o].input;
            s.push({ id_output: l, id: e, output_class: d, input_class: t });
          }),
            s.forEach((e, t) => {
              this.removeSingleConnection(
                e.id_output,
                e.id,
                e.output_class,
                e.input_class
              );
            }),
            delete this.drawflow.drawflow[n].data[e].inputs[t];
          const o = [],
            l = this.drawflow.drawflow[n].data[e].inputs;
          Object.keys(l).map(function (e, t) {
            o.push(l[e]);
          }),
            (this.drawflow.drawflow[n].data[e].inputs = {});
          const d = t.slice(6);
          let c = [];
          if (
            (o.forEach((t, i) => {
              t.connections.forEach((e, t) => {
                c.push(e);
              }),
                (this.drawflow.drawflow[n].data[e].inputs[
                  'input_' + (i + 1)
                ] = t);
            }),
            (c = new Set(c.map((e) => JSON.stringify(e)))),
            (c = Array.from(c).map((e) => JSON.parse(e))),
            this.module === n)
          ) {
            document
              .querySelectorAll('#node-' + e + ' .inputs .input')
              .forEach((e, t) => {
                const n = e.classList[1].slice(6);
                parseInt(d) < parseInt(n) &&
                  (e.classList.remove('input_' + n),
                  e.classList.add('input_' + (n - 1)));
              });
          }
          c.forEach((t, i) => {
            this.drawflow.drawflow[n].data[t.node].outputs[
              t.input
            ].connections.forEach((i, s) => {
              if (i.node == e) {
                const o = i.output.slice(6);
                if (parseInt(d) < parseInt(o)) {
                  if (this.module === n) {
                    const n = document.querySelector(
                      '.connection.node_in_node-' +
                        e +
                        '.node_out_node-' +
                        t.node +
                        '.' +
                        t.input +
                        '.input_' +
                        o
                    );
                    n.classList.remove('input_' + o),
                      n.classList.add('input_' + (o - 1));
                  }
                  i.points
                    ? (this.drawflow.drawflow[n].data[t.node].outputs[
                        t.input
                      ].connections[s] = {
                        node: i.node,
                        output: 'input_' + (o - 1),
                        points: i.points,
                      })
                    : (this.drawflow.drawflow[n].data[t.node].outputs[
                        t.input
                      ].connections[s] = {
                        node: i.node,
                        output: 'input_' + (o - 1),
                      });
                }
              }
            });
          }),
            this.updateConnectionNodes('node-' + e);
        }
        removeNodeOutput(e, t) {
          var n = this.getModuleFromNodeId(e);
          const i = this.getNodeFromId(e);
          this.module === n &&
            document
              .querySelector('#node-' + e + ' .outputs .output.' + t)
              .remove();
          const s = [];
          Object.keys(i.outputs[t].connections).map(function (n, o) {
            const l = i.outputs[t].connections[o].node,
              d = i.outputs[t].connections[o].output;
            s.push({ id: e, id_input: l, output_class: t, input_class: d });
          }),
            s.forEach((e, t) => {
              this.removeSingleConnection(
                e.id,
                e.id_input,
                e.output_class,
                e.input_class
              );
            }),
            delete this.drawflow.drawflow[n].data[e].outputs[t];
          const o = [],
            l = this.drawflow.drawflow[n].data[e].outputs;
          Object.keys(l).map(function (e, t) {
            o.push(l[e]);
          }),
            (this.drawflow.drawflow[n].data[e].outputs = {});
          const d = t.slice(7);
          let c = [];
          if (
            (o.forEach((t, i) => {
              t.connections.forEach((e, t) => {
                c.push({ node: e.node, output: e.output });
              }),
                (this.drawflow.drawflow[n].data[e].outputs[
                  'output_' + (i + 1)
                ] = t);
            }),
            (c = new Set(c.map((e) => JSON.stringify(e)))),
            (c = Array.from(c).map((e) => JSON.parse(e))),
            this.module === n)
          ) {
            document
              .querySelectorAll('#node-' + e + ' .outputs .output')
              .forEach((e, t) => {
                const n = e.classList[1].slice(7);
                parseInt(d) < parseInt(n) &&
                  (e.classList.remove('output_' + n),
                  e.classList.add('output_' + (n - 1)));
              });
          }
          c.forEach((t, i) => {
            this.drawflow.drawflow[n].data[t.node].inputs[
              t.output
            ].connections.forEach((i, s) => {
              if (i.node == e) {
                const o = i.input.slice(7);
                if (parseInt(d) < parseInt(o)) {
                  if (this.module === n) {
                    const n = document.querySelector(
                      '.connection.node_in_node-' +
                        t.node +
                        '.node_out_node-' +
                        e +
                        '.output_' +
                        o +
                        '.' +
                        t.output
                    );
                    n.classList.remove('output_' + o),
                      n.classList.remove(t.output),
                      n.classList.add('output_' + (o - 1)),
                      n.classList.add(t.output);
                  }
                  i.points
                    ? (this.drawflow.drawflow[n].data[t.node].inputs[
                        t.output
                      ].connections[s] = {
                        node: i.node,
                        input: 'output_' + (o - 1),
                        points: i.points,
                      })
                    : (this.drawflow.drawflow[n].data[t.node].inputs[
                        t.output
                      ].connections[s] = {
                        node: i.node,
                        input: 'output_' + (o - 1),
                      });
                }
              }
            });
          }),
            this.updateConnectionNodes('node-' + e);
        }
        removeNodeId(e) {
          this.removeConnectionNodeId(e);
          var t = this.getModuleFromNodeId(e.slice(5));
          this.module === t && document.getElementById(e).remove(),
            delete this.drawflow.drawflow[t].data[e.slice(5)],
            this.dispatch('nodeRemoved', e.slice(5));
        }
        removeConnection() {
          if (null != this.connection_selected) {
            var e = this.connection_selected.parentElement.classList;
            this.connection_selected.parentElement.remove();
            var t = this.drawflow.drawflow[this.module].data[
              e[2].slice(14)
            ].outputs[e[3]].connections.findIndex(function (t, n) {
              return t.node === e[1].slice(13) && t.output === e[4];
            });
            this.drawflow.drawflow[this.module].data[e[2].slice(14)].outputs[
              e[3]
            ].connections.splice(t, 1);
            var n = this.drawflow.drawflow[this.module].data[
              e[1].slice(13)
            ].inputs[e[4]].connections.findIndex(function (t, n) {
              return t.node === e[2].slice(14) && t.input === e[3];
            });
            this.drawflow.drawflow[this.module].data[e[1].slice(13)].inputs[
              e[4]
            ].connections.splice(n, 1),
              this.dispatch('connectionRemoved', {
                output_id: e[2].slice(14),
                input_id: e[1].slice(13),
                output_class: e[3],
                input_class: e[4],
              }),
              (this.connection_selected = null);
          }
        }
        removeSingleConnection(e, t, n, i) {
          var s = this.getModuleFromNodeId(e);
          if (s === this.getModuleFromNodeId(t)) {
            if (
              this.drawflow.drawflow[s].data[e].outputs[
                n
              ].connections.findIndex(function (e, n) {
                return e.node == t && e.output === i;
              }) > -1
            ) {
              this.module === s &&
                document
                  .querySelector(
                    '.connection.node_in_node-' +
                      t +
                      '.node_out_node-' +
                      e +
                      '.' +
                      n +
                      '.' +
                      i
                  )
                  .remove();
              var o = this.drawflow.drawflow[s].data[e].outputs[
                n
              ].connections.findIndex(function (e, n) {
                return e.node == t && e.output === i;
              });
              this.drawflow.drawflow[s].data[e].outputs[n].connections.splice(
                o,
                1
              );
              var l = this.drawflow.drawflow[s].data[t].inputs[
                i
              ].connections.findIndex(function (t, i) {
                return t.node == e && t.input === n;
              });
              return (
                this.drawflow.drawflow[s].data[t].inputs[i].connections.splice(
                  l,
                  1
                ),
                this.dispatch('connectionRemoved', {
                  output_id: e,
                  input_id: t,
                  output_class: n,
                  input_class: i,
                }),
                !0
              );
            }
            return !1;
          }
          return !1;
        }
        removeConnectionNodeId(e) {
          const t = 'node_in_' + e,
            n = 'node_out_' + e,
            i = document.getElementsByClassName(n);
          for (var s = i.length - 1; s >= 0; s--) {
            var o = i[s].classList,
              l = this.drawflow.drawflow[this.module].data[
                o[1].slice(13)
              ].inputs[o[4]].connections.findIndex(function (e, t) {
                return e.node === o[2].slice(14) && e.input === o[3];
              });
            this.drawflow.drawflow[this.module].data[o[1].slice(13)].inputs[
              o[4]
            ].connections.splice(l, 1);
            var d = this.drawflow.drawflow[this.module].data[
              o[2].slice(14)
            ].outputs[o[3]].connections.findIndex(function (e, t) {
              return e.node === o[1].slice(13) && e.output === o[4];
            });
            this.drawflow.drawflow[this.module].data[o[2].slice(14)].outputs[
              o[3]
            ].connections.splice(d, 1),
              i[s].remove(),
              this.dispatch('connectionRemoved', {
                output_id: o[2].slice(14),
                input_id: o[1].slice(13),
                output_class: o[3],
                input_class: o[4],
              });
          }
          const c = document.getElementsByClassName(t);
          for (s = c.length - 1; s >= 0; s--) {
            (o = c[s].classList),
              (d = this.drawflow.drawflow[this.module].data[
                o[2].slice(14)
              ].outputs[o[3]].connections.findIndex(function (e, t) {
                return e.node === o[1].slice(13) && e.output === o[4];
              }));
            this.drawflow.drawflow[this.module].data[o[2].slice(14)].outputs[
              o[3]
            ].connections.splice(d, 1);
            l = this.drawflow.drawflow[this.module].data[o[1].slice(13)].inputs[
              o[4]
            ].connections.findIndex(function (e, t) {
              return e.node === o[2].slice(14) && e.input === o[3];
            });
            this.drawflow.drawflow[this.module].data[o[1].slice(13)].inputs[
              o[4]
            ].connections.splice(l, 1),
              c[s].remove(),
              this.dispatch('connectionRemoved', {
                output_id: o[2].slice(14),
                input_id: o[1].slice(13),
                output_class: o[3],
                input_class: o[4],
              });
          }
        }
        getModuleFromNodeId(e) {
          var t;
          const n = this.drawflow.drawflow;
          return (
            Object.keys(n).map(function (i, s) {
              Object.keys(n[i].data).map(function (n, s) {
                n == e && (t = i);
              });
            }),
            t
          );
        }
        addModule(e) {
          (this.drawflow.drawflow[e] = {
            data: {},
          }),
            this.dispatch('moduleCreated', e);
        }
        changeModule(e) {
          this.dispatch('moduleChanged', e),
            (this.module = e),
            (this.precanvas.innerHTML = ''),
            (this.canvas_x = 0),
            (this.canvas_y = 0),
            (this.pos_x = 0),
            (this.pos_y = 0),
            (this.mouse_x = 0),
            (this.mouse_y = 0),
            (this.zoom = 1),
            (this.precanvas.style.transform = ''),
            this.import(this.drawflow);
        }
        removeModule(e) {
          this.module === e && this.changeModule('Home'),
            delete this.drawflow.drawflow[e],
            this.dispatch('moduleRemoved', e);
        }
        clearModuleSelected() {
          (this.precanvas.innerHTML = ''),
            (this.drawflow.drawflow[this.module] = {
              data: {},
            });
        }
        clear() {
          (this.precanvas.innerHTML = ''),
            (this.drawflow = {
              drawflow: {
                Home: {
                  data: {},
                },
              },
            });
        }
        export() {
          const e = JSON.parse(JSON.stringify(this.drawflow));
          return this.dispatch('export', e), e;
        }
        import(e) {
          this.clear(),
            (this.drawflow = JSON.parse(JSON.stringify(e))),
            this.load(),
            this.dispatch('import', 'import');
        }
        on(e, t) {
          return 'function' != typeof t
            ? (console.error(
                'The listener callback must be a function, the given type is ' +
                  typeof t
              ),
              !1)
            : 'string' != typeof e
            ? (console.error(
                'The event name must be a string, the given type is ' + typeof e
              ),
              !1)
            : (void 0 === this.events[e] &&
                (this.events[e] = { listeners: [] }),
              void this.events[e].listeners.push(t));
        }
        removeListener(e, t) {
          if (void 0 === this.events[e]) return !1;

          this.events[e].listeners = this.events[e].listeners.filter(
            (e) => e.toString() !== t.toString()
          );
        }
        dispatch(e, t) {
          if (void 0 === this.events[e]) return !1;

          this.events[e].listeners.forEach((e) => {
            e(t);
          });
        }
      }
    },
  ]).default;
});
