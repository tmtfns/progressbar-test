import { ProgressBarStatuses } from '@/types/progress';
import type { ProgressColor } from '@/types/progress';

export function getProgressColor(
	status: ProgressBarStatuses,
	percent: number
): string {
	if (status === ProgressBarStatuses.success) return '#12ce66';
	if (status === ProgressBarStatuses.warning) return '#e7a23d';
	if (status === ProgressBarStatuses.error) return '#ff4949';

	//red #f56c6d rgb(245, 108, 109)
	// blue #1c8af7 rgb(28, 138, 247)
	// green #12ce66 rgb(18, 206, 102)
	// динамический градиент от красного к зелёному
	//linear-gradient(to right, red 0%, red 10%, blue 20%, blue 90%, green 100%);
	let r = 18,
		g = 206,
		b = 102;
	if (percent < 10) {
		r = 245;
		g = 108;
		b = 109;
	} else if (percent < 20) {
		const shift = (percent - 10) / 10;
		r = Math.round(245 - 217 * shift);
		g = Math.round(108 + 30 * shift);
		b = Math.round(109 + 138 * shift);
	} else if (percent < 90) {
		r = 28;
		g = 138;
		b = 247;
	} else if (percent < 100) {
		const shift = (percent - 90) / 10;
		r = Math.round(28 - 10 * shift);
		g = Math.round(138 + 68 * shift);
		b = Math.round(247 - 145 * shift);
	}

	return `rgb(${r},${g},${b})`;
}


export function parseRGB(rgbString: string): ProgressColor | null {
  
  const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  const result = rgbString.match(rgbRegex);

  if (result && result[1] && result[2] && result[3]) {
    // Return the r, g, b values as integers
    return {
      r: parseInt(result[1], 10),
      g: parseInt(result[2], 10),
      b: parseInt(result[3], 10),
    };
  } else {    
    return null;
  }
}

const warningColor = {
    r: 231, 
    g: 162, 
    b: 61
}

const errorColor = {
    r: 255, 
    g: 73, 
    b: 73
}

export function animatedColor(progress: ProgressColor | null, status: ProgressBarStatuses, speed: number): string  {
    let res: ProgressColor;
    const endColor = (status === ProgressBarStatuses.warning) ? warningColor : errorColor;
    if (progress) {
        res = {
            r: Math.round(progress.r + (endColor.r - progress.r)  * speed),
            g: Math.round(progress.g + (endColor.g - progress.g)  * speed),
            b: Math.round(progress.b + (endColor.b - progress.b)  * speed),
        }
    } else {
        res = endColor;
    }
    return `rgb(${res.r},${res.g},${res.b})`;
}