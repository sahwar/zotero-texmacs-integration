;;;
;;
;; MODULE      : init-zotero.scm
;; DESCRIPTION : Initialize Zotero Connector Plugin
;; COPYRIGHT   : (C) 2016  Karl M. Hegbloom <karl.hegbloom@gmail.com>
;;
;; This software falls under the GNU general public license version 3 or
;; later. It comes WITHOUT ANY WARRANTY WHATSOEVER. For details, see the file
;; LICENSE in the root directory or <http://www.gnu.org/licenses/gpl-3.0.html>
;;
;;;

(plugin-configure zotero
  (:require #t))

;; The tm-zotero.ts will load the zotero.scm module.
(when (supports-zotero?)
  (texmacs-modes
    (in-tm-zotero-style% (style-has? "tm-zotero-dtd"))
    (in-zcite% (inside? 'zcite))
    (in-zbibliography% (inside? 'zbibliography))
    (in-zfield% (or (inside? 'zcite)
                    (inside? 'zbibliography))))

  ;;(lazy-keyboard (zotero-kbd) in-zotero-style?)
  (lazy-menu (zotero-menu) in-tm-zotero-style?))
