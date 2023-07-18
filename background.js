chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (changeInfo.status === 'complete' && tab.url.includes('youtube.com')) {
	  clearInterval(tab.intervalId); // 기존에 등록된 setInterval을 해제합니다.

	  // 1초마다 쇼츠 버튼, 쇼츠 선반을 확인하고 삭제하며, 원하는 URL에 접속했을 때 HTML 내용을 변경하는 함수를 실행합니다.
	  tab.intervalId = setInterval(function() {
		chrome.tabs.executeScript(tabId, {
		  code: `
			(function() {
			  const shortsButton = document.querySelector('[aria-label="Shorts"]');
			  if (shortsButton) {
				shortsButton.style.display = 'none';
			  }
			})();

			(function() {
			  const hideShortsShelf = function() {
				const shortsShelf = document.querySelector('.ytd-rich-shelf-renderer.style-scope');
				if (shortsShelf) {
				  shortsShelf.style.display = 'none';
				}
			  };
		  
			  hideShortsShelf();
		  
			  const observer = new MutationObserver(function(mutationsList, observer) {
				hideShortsShelf();
			  });
		  
			  observer.observe(document, { childList: true, subtree: true });
			})();

			(function() {
			  const hideShortsRoleTitle = function() {
				const elements = document.querySelectorAll('[title="Shorts"]');
				elements.forEach(function(element) {
				  element.style.display = 'none';
				});
			  };

			  hideShortsRoleTitle();

			  const observer = new MutationObserver(function(mutationsList, observer) {
				hideShortsRoleTitle();
			  });

			  observer.observe(document, { childList: true, subtree: true });
			})();
		  `
		});
	  }, 1000);
	}
});
