// Replaces the default Frappe Framework logo (frappe.boot.app_data[0].app_logo_url)
// with the Sitiame Capital mark, wherever it renders in the desk UI.
(function () {
	var SITIAME_MARK = "/files/sitiame-capital-mark.png";
	var DEFAULT_FRAPPE_LOGO = "/assets/frappe/images/frappe-framework-logo.svg";

	function patchBoot() {
		try {
			if (
				window.frappe &&
				frappe.boot &&
				Array.isArray(frappe.boot.app_data) &&
				frappe.boot.app_data[0]
			) {
				frappe.boot.app_data[0].app_logo_url = SITIAME_MARK;
			}
		} catch (e) {
			// no-op
		}
	}

	function patchDom() {
		document.querySelectorAll('img[src="' + DEFAULT_FRAPPE_LOGO + '"]').forEach(function (img) {
			img.src = SITIAME_MARK;
		});
	}

	patchBoot();

	if (window.frappe && frappe.ready) {
		frappe.ready(function () {
			patchBoot();
			patchDom();
		});
	}

	// Desk is a single-page app: watch for later re-renders (route changes, etc.)
	var observer = new MutationObserver(patchDom);
	document.addEventListener("DOMContentLoaded", function () {
		observer.observe(document.body, { childList: true, subtree: true });
	});
})();
