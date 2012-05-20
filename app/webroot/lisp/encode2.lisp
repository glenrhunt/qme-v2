
(require :yason)

;; (defstruct place id name in note)
;; (defstruct quantity id name type in note) 
;; (defstruct claim id cause effect direction note)
;; (defstruct fact id from to direction note) 
;; (defstruct prediction id from to direction paths)

(defun join-into-string (arg)
  (format nil "~{~A~^ ~}" arg))

(defmethod json:encode ((place place) &optional (stream *standard-output*))
  (json:with-output (stream)
    (json:with-object ()
      (json:encode-object-element "id" (string (place-id place)))
      (json:encode-object-element "name" (string (place-name place)))
      (json:encode-object-element "in" (string (place-in place)))
      (json:encode-object-element "note" (string (place-note place))))))

(defmethod json:encode ((quantity quantity) &optional (stream *standard-output*))
  (json:with-output (stream)
    (json:with-object ()
      (json:encode-object-element "id" (string (quantity-id quantity)))
      (json:encode-object-element "name" (string (quantity-name quantity)))
      (json:encode-object-element "type" (string (quantity-type quantity)))
      (json:encode-object-element "in" (string (quantity-in quantity)))
      (json:encode-object-element "note" (string (quantity-note quantity))))))

(defmethod json:encode ((claim claim) &optional (stream *standard-output*))
  (json:with-output (stream)
    (json:with-object ()
      (json:encode-object-element "id" (string (claim-id claim)))
      (json:encode-object-element "cause" (string (claim-cause claim)))
      (json:encode-object-element "effect" (string (claim-effect claim)))
      (json:encode-object-element "direction" (string (claim-direction claim)))
      (json:encode-object-element "note" (join-into-string (claim-note claim))))))

(defmethod json:encode ((fact fact) &optional (stream *standard-output*))
  (json:with-output (stream)
    (json:with-object ()
      (json:encode-object-element "id" (string (fact-id fact)))
      (json:encode-object-element "from" (string (fact-from fact)))
      (json:encode-object-element "to" (string (fact-to fact)))
      (json:encode-object-element "direction" (string (fact-direction fact)))
      (json:encode-object-element "note" (string (fact-note fact))))))

;; (defmethod json:encode ((prediction prediction) &optional (stream *standard-output*))
;;   (json:with-output (stream)
;;     (json:with-object ()
;;       (json:encode-object-element "id" (string (prediction-id prediction)))
;;       (json:encode-object-element "from" (string (prediction-from prediction)))
;;       (json:encode-object-element "to" (string (prediction-to prediction)))
;;       (json:encode-object-element "direction" (string (prediction-direction prediction)))
;;       (json:encode-object-element "paths" (string (prediction-paths prediction))))))

(defmethod json:encode ((symbol symbol) &optional (stream *standard-output*))
  (json:with-output (stream)
    (json:encode (string symbol))))

(defmethod json:encode ((prediction prediction) &optional (stream *standard-output*))
  (let* ((from-qty (get-quantity-by-id (prediction-from prediction) quantities*))
    (from-name (quantity-name from-qty))
    (from-loc (get-place-name-by-id (quantity-in from-qty) places*))
    (to-qty (get-quantity-by-id (prediction-to prediction) quantities*))
    (to-name (quantity-name to-qty))
    (to-loc (get-place-name-by-id (quantity-in to-qty) places*)))
    (json:with-output (stream)
      (json:with-object ()
			(json:encode-object-element "id" (string (prediction-id prediction)))
      ; (json:encode-object-element "from" (string (prediction-from prediction)))
      (json:encode-object-element "from" (format nil "~A@~A" from-name from-loc))
      (json:encode-object-element "to" (format nil "~A@~A" to-name to-loc))
			(json:encode-object-element "direction" (string (prediction-direction prediction)))
			(json:encode-object-element "paths" (build-path-list prediction))))))
			
;; (defstruct claim id cause effect direction note)

(defun build-path-list (p)
  (let ((master-list nil)
	(direction nil)
	(lst nil))
    (loop for path in (prediction-paths p) do
	 (setq direction (car path))
	 (setq lst nil)
	 (loop for item in (cdr path) do
	   (let* ((cause-qty (get-quantity-by-id (claim-cause item) quantities*))
      (cause-name (quantity-name cause-qty))
      (cause-loc (get-place-name-by-id (quantity-in cause-qty) places*))
      (effect-qty (get-quantity-by-id (claim-effect item) quantities*))
      (effect-name (quantity-name effect-qty))
      (effect-loc (get-place-name-by-id (quantity-in effect-qty) places*)))
      (push (format nil "~A@~A_~A@~A" cause-name cause-loc effect-name effect-loc) lst)))
        ; (push (claim-id item) lst))
	 (push (list direction lst) master-list)
	 )
    (reverse (reverse master-list))))

(defun load-all-predictions (facts)
  (cond ((null facts) (setq facts facts*))
	(t (setq facts
		 (mapcar #'(lambda (f) (get-fact-by-id f facts*)) facts))))
	(mapc #'load-one-prediction (compare-to-facts facts)))

(defun load-one-prediction (pair)
  (let ((fact (car pair))
	(prediction (cdr pair)))))