document.addEventListener('DOMContentLoaded', () => {
	let quickInputObserver = null;
	function createObserver() {
		document.querySelector('.monaco-grid-view').classList.add('blur');
		setTimeout(() => {
			const quickInputWidget = document.querySelector('.quick-input-widget');
			const monacoGridView = document.querySelector('.monaco-grid-view');
			if (!quickInputWidget) {
				return;
			}
			if (quickInputObserver) {
				return;
			}
			quickInputObserver = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
						if (quickInputWidget.style.display === 'none') {
							monacoGridView.classList.remove('blur');
						} else {
							monacoGridView.classList.add('blur');
						}
					}
				});
			});
			quickInputObserver.observe(quickInputWidget, { attributes: true });
		}, 1000);
	}

	document.addEventListener('keydown', (event) => {
		if (event.ctrlKey && event.key === 'p') {
			createObserver();
		}

		if (event.ctrlKey && event.shiftKey && event.key === 'P') {
			event.preventDefault();
			createObserver();
		}
	});
});
