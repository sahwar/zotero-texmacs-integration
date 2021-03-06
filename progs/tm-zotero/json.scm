;;; coding: utf-8
;;; ¶
;;; (tm-zotero json) --- Guile JSON implementation (for Guile 1.8)

;; Copyright (C) 2013 Aleix Conchillo Flaque <aconchillo@gmail.com>
;;
;; This file is part of guile-json.
;;
;; guile-json is free software; you can redistribute it and/or
;; modify it under the terms of the GNU Lesser General Public
;; License as published by the Free Software Foundation; either
;; version 3 of the License, or (at your option) any later version.
;;
;; guile-json is distributed in the hope that it will be useful,
;; but WITHOUT ANY WARRANTY; without even the implied warranty of
;; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
;; Lesser General Public License for more details.
;;
;; You should have received a copy of the GNU Lesser General Public
;; License along with guile-json; if not, write to the Free Software
;; Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
;; 02110-1301 USA

;;; Commentary:

;; JSON module for Guile

;;; Modified for TeXmacs and Guile 1.8 by Karl M. Hegbloom
;;; for use in the zotero-texmacs-integration.

;;; Code:

(define-module (tm-zotero json)
  #:use-module (ice-9 syncase)
  #:use-module (tm-zotero json builder)
  #:use-module (tm-zotero json parser)
  #:use-module (tm-zotero json syntax)
  #:re-export (scm->json
               scm->json-string
               json->scm
               json-string->scm
               json-parser?
               json-parser-port
               json
               list->hash-table))

;; (define-syntax re-export-modules
;;   (syntax-rules ()
;;     ((_ (mod ...) ...)
;;      (begin
;;        (module-use! (module-public-interface (current-module))
;;                     (resolve-interface '(mod ...)))
;;        ...))))
;;
;; (re-export-modules (json builder)
;;                    (json parser)
;;                    (json syntax))

;;; (json) ends here
