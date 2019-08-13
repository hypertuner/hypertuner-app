import React from 'react';
import { Terminal } from 'xterm';
import * as attach from 'xterm/lib/addons/attach/attach';
import * as fit from 'xterm/lib/addons/fit/fit';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import * as search from 'xterm/lib/addons/search/search';
import getId from './GetId';

Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(fullscreen);
Terminal.applyAddon(search);

const PORT = 9001 // WebSocket port 

const HOST = `127.0.0.1:${ PORT }`;
const SOCKET_URL = `ws://${ HOST }/terminal/`;

export default class ReactTerminal extends React.Component {
  constructor(props) {
    super(props);

    this.elementId = `terminal_${ getId() }`;
    this.failures = 0;
    this.interval = null;
    this.fontSize = 16;
    this.state = {
      command: ''
    };
  }
  componentDidMount() {
    this.term = new Terminal({
      cursorBlink: true,
      rows: 3,
      fontSize: this.fontSize,
      windowsMode: true,
      theme: {
        foreground: '#000',
        background: '#FFF',
        cursor: '#000',
      }
    });

    this.term.open(document.querySelector(`#${ this.elementId }`));
    this.term.fit();
    this.term.focus();
    // this.term.on('resize', ({ cols, rows }) => {
    //   if (!this.pid) return;
    //   fetch(`http://${ HOST }/terminals/${ this.pid }/size?cols=${ cols }&rows=${ rows }`, { method: 'POST' });
    // });
    this.term.decreaseFontSize = () => {
      this.term.setOption('fontSize', --this.fontSize);
      this.term.fit();
    };
    this.term.increaseFontSize = () => {
      this.term.setOption('fontSize', ++this.fontSize);
      this.term.fit();
    };
    this._connectToServer();

    listenToWindowResize(() => {
      this.term.fit();
    });
    this.term.fit();
    this.term.textarea.onkeydown = e => {
      console.log(e.keyCode, e.shiftKey, e.ctrlKey, e.altKey);
      // ctrl + shift + metakey + +
      if ((e.keyCode === 187 || e.keyCode === 61) && e.shiftKey && e.ctrlKey && e.altKey) {
        this.term.setOption('fontSize', ++this.fontSize);
        this.term.fit();
      }
      // ctrl + shift + metakey + -
      if ((e.keyCode === 189 || e.keyCode === 173) && e.shiftKey && e.ctrlKey && e.altKey) {
        this.term.setOption('fontSize', --this.fontSize);
        this.term.fit();
      }
      // ctrl + shift + metakey + v
      if (e.keyCode === 86 && e.shiftKey && e.ctrlKey && e.altKey) {
        this.props.options.splitVertical && this.props.options.splitVertical();
      }
      // ctrl + shift + metakey + h
      if (e.keyCode === 72 && e.shiftKey && e.ctrlKey && e.altKey) {
        this.props.options.splitHorizontal && this.props.options.splitHorizontal();
      }
      // ctrl + shift + metakey + w
      if (e.keyCode === 87 && e.shiftKey && e.ctrlKey && e.altKey) {
        this.props.options.close && this.props.options.close();
      }
    };
  }
  componentWillUnmount() {
    clearTimeout(this.interval);
  }
  render() {

    return <div style={{
      position: 'absolute', width: '100%', height: '100%', padding: 'none', margin: 'none'
    }}>
        <div id={ this.elementId } style={{
          position: 'absolute', top: 0, left: 0, padding: 'none', margin: 'none', width: '100%', height: '100%'
        }}></div>

        <style>
          {`.xterm {
            font-feature-settings: "liga" 0;
            position: relative;
            user-select: none;
            padding: none;
            margin: none;
            -ms-user-select: none;
            -webkit-user-select: none;
            }

            .xterm.focus,
            .xterm:focus {
                outline: none;
            }

            .xterm .xterm-helpers {
                position: absolute;
                top: 0;
                /**
                 * The z-index of the helpers must be higher than the canvases in order for
                 * IMEs to appear on top.
                 */
                z-index: 5;
            }

            .xterm .xterm-helper-textarea {
                /*
                * HACK: to fix IE's blinking cursor
                * Move textarea out of the screen to the far left, so that the cursor is not visible.
                */
                position: absolute;
                opacity: 0;
                left: -9999em;
                top: 0;
                width: 0;
                height: 0;
                z-index: -5;
                /** Prevent wrapping so the IME appears against the textarea at the correct position */
                white-space: nowrap;
                overflow: hidden;
                resize: none;
            }

            .xterm .composition-view {
                /* TODO: Composition position got messed up somewhere */
                background: #000;
                color: #FFF;
                display: none;
                position: absolute;
                white-space: nowrap;
                z-index: 1;
            }

            .xterm .composition-view.active {
                display: block;
            }

            .xterm .xterm-viewport {
                /* On OS X this is required in order for the scroll bar to appear fully opaque */
                background-color: #000;
                overflow-y: scroll;
                cursor: default;
                position: absolute;
                right: 0;
                left: 0;
                top: 0;
                bottom: 0;
            }

            .xterm .xterm-screen {
                position: relative;
            }

            .xterm .xterm-screen canvas {
                position: absolute;
                left: 0;
                top: 0;
            }

            .xterm .xterm-scroll-area {
                visibility: hidden;
            }

            .xterm-char-measure-element {
                display: inline-block;
                visibility: hidden;
                position: absolute;
                top: 0;
                left: -9999em;
                line-height: normal;
            }

            .xterm {
                cursor: text;
            }

            .xterm.enable-mouse-events {
                /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
                cursor: default;
            }

            .xterm.xterm-cursor-pointer {
                cursor: pointer;
            }

            .xterm.column-select.focus {
                /* Column selection mode */
                cursor: crosshair;
            }

            .xterm .xterm-accessibility,
            .xterm .xterm-message {
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                right: 0;
                z-index: 10;
                color: transparent;
            }

            .xterm .live-region {
                position: absolute;
                left: -9999px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            }

            .xterm-dim {
                opacity: 0.5;
            }

            .xterm-underline {
                text-decoration: underline;
            }`}
        </style>

      </div>;
  }
  _connectToServer() {
    this.socket = new WebSocket(SOCKET_URL);
    this.socket.onopen = () => {
      this.term.attach(this.socket);
    };
    this.socket.onclose = () => {
      this.term.writeln('Server disconnected!');
      this._tryAgain();
    };
    this.socket.onerror = () => {
      this.term.writeln('Server disconnected!');
      this._tryAgain();
    };
  };

  _tryAgain() {
    this.failiures ++;
    clearTimeout(this.interval);
    if (this.failiures <= 3) {
      this.interval = setTimeout(() => {
        this._connectToServer();
      }, 2000);
    }
  }
};

function listenToWindowResize(callback) {
  var resizeTimeout;

  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        callback();
      }, 66);
    }
  }

  window.addEventListener('resize', resizeThrottler, false);
}