import { easeBounceOut } from 'd3-ease';
import { interpolateString } from 'd3-interpolate';


function startAnimationLoop({ onProgress, onComplete, duration, initialProgress }) {
  let start = null;
  let requestId = null;

  const startTimeDiff = (initialProgress || 0) * duration;

  const step = (timestamp) => {
    if (!start) start = timestamp - startTimeDiff;
    let progress = (timestamp - start) / duration;
    if (progress > 1) {
      progress = 1;
    }
    onProgress(progress);

    if (progress < 1) {
      requestId = window.requestAnimationFrame(step);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  }
  requestId = window.requestAnimationFrame(step);

  return {
    stop() {
      cancelAnimationFrame(requestId);
    }
  }
}



function getStyles(element, props) {
  const computed = window.getComputedStyle(element);
  return props.reduce((obj, prop) => {
    obj[prop] = computed[prop];
    return obj;
  }, {});
}



/* custom animations */
function slide(element, { duration, direction, onComplete }) {
  const collapsedStyles = {
    marginTop: '0px',
    marginBottom: '0px',
    height: '0px',
  }
  const props = Object.keys(collapsedStyles);

  const [ startStyles, targetStyles ] = direction === 'DOWN'
    ? [ collapsedStyles, getStyles(element, props) ]
    : [ getStyles(element, props), collapsedStyles ]
  const interpolators = new Map(props.map(
    prop => [prop, interpolateString(startStyles[prop], targetStyles[prop])]
  ));

  return startAnimationLoop({
    duration,
    onComplete,
    onProgress: progress => {
      const delta = easeBounceOut(progress);
      interpolators.forEach((interpolator, prop) => {
        element.style[prop] = interpolator(delta);
      });
    },
  });
}

function slideDown(element, { duration = 1000, onComplete } = {}) {
  return slide(element, { direction: 'DOWN', duration, onComplete });
}

function slideUp(element, { duration = 1000, onComplete } = {}) {
  return slide(element, { direction: 'UP', duration, onComplete });
}


export { startAnimationLoop, slide, slideDown, slideUp }