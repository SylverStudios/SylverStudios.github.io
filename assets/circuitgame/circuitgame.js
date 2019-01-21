/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var CircuitGame = __webpack_require__(1);

	var containerId = 'game-container';

	var game = new CircuitGame(containerId, 800, 600);



	function getRandomInt(minInclusive, maxExclusive) {
	  return Math.floor(Math.random() * (maxExclusive - minInclusive)) + minInclusive;
	}
	function startWithRandomMap() {
	  var index = getRandomInt(0, 3);
	  game.startNewGame(index);
	  console.log("Starting game with map : "+index);
	}

	document.getElementById('start-button').onclick = startWithRandomMap;





/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Entry point for circuit game app.
	 */

	var _ = __webpack_require__(2);

	var Visualizer = __webpack_require__(3);
	var StateManager = __webpack_require__(6);
	var SceneGenerator = __webpack_require__(8);
	var PremadeScenes = __webpack_require__(9);
	var GateType = __webpack_require__(5);

	var CircuitGame = function(containerId, width, height) {
	  var self = this;

	  this.startNewGame = function(premadeGameIndex) {
	    if (premadeGameIndex === undefined) {
	      self.scene = SceneGenerator.generate();
	    } else if (_.contains(_.keys(PremadeScenes), '' + premadeGameIndex)){
	      self.scene = PremadeScenes[premadeGameIndex];
	    } else {
	      throw 'invalid premadeGameIndex: ' + premadeGameIndex;
	    }
	    self.state = StateManager.computeState(self.scene);
	    self.visualizer.setScene(self.scene, self.state);
	  };

	  this.changeGateType = function(gateIndex, gateType) {
	    if (!self.scene) {
	      throw 'cannot change gate type, no current scene';
	    }
	    if (!_.contains(self.scene.gateNodeIds, gateIndex)) {
	      throw 'invalid gateIndex: ' + gateIndex;
	    }
	    if (!_.contains(GateType, gateType)) {
	      throw 'invalid gateType: ' + gateType;
	    }
	    var gateTypes = self.state.gateTypes;
	    gateTypes[gateIndex] = gateType;
	    self.state = StateManager.computeState(self.scene, gateTypes);
	    self.visualizer.update(self.state);
	  };

	  this.visualizer = new Visualizer(containerId, width, height, _.size(PremadeScenes), this.startNewGame, this.changeGateType);
	  this.startNewGame(1);
	};

	module.exports = CircuitGame;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2);
	var canvasUtil = __webpack_require__(4);
	var GateType = __webpack_require__(5);

	var Visualizer = function(containerId, width, height, sizeOfPremadeScenes, startGameCallback, changeGateTypeCallback) {
	  var canvas, nodeMap, inputNodes, pen, initialScene, ImprovedGateType, currentState, currentObjective;

	  var sizeScenes = sizeOfPremadeScenes;
	  var startFunction = startGameCallback;
	  var changeFunction = changeGateTypeCallback;

	  createCanvas(containerId, width, height);

	  pen = new canvasUtil(canvas);

	// This is a fuckin mess...solve it another way
	// TODO
	  ImprovedGateType = {
	    AND: {id: 1,
	          name: 'GATETYPE_AND'},
	    OR: {id: 2,
	          name: 'GATETYPE_OR'},
	    NAND: {id: 3,
	          name: 'GATETYPE_NAND'},
	    NOR: {id : 4,
	          name: 'GATETYPE_NOR'},
	    XOR: {id: 5,
	          name: 'GATETYPE_XOR'},
	    XNOR: {id: 6,
	          name: 'GATETYPE_XNOR'}
	  }
	  ImprovedGateType['AND'].next = ImprovedGateType['OR'];
	  ImprovedGateType['OR'].next = ImprovedGateType['NAND'];
	  ImprovedGateType['NAND'].next = ImprovedGateType['NOR'];
	  ImprovedGateType['NOR'].next = ImprovedGateType['XOR'];
	  ImprovedGateType['XOR'].next = ImprovedGateType['XNOR'];
	  ImprovedGateType['XNOR'].next = ImprovedGateType['AND'];


	  // Create the canvas on the page and initial map computations
	  this.setScene = function(scene, state) {
	    currentState = state;
	    initialScene = scene;
	    nodeMap = scene.nodes;
	    pen.clear();

	    setValuesOnInputNodes();

	    _.each(mapUtility.getOutputNodes(nodeMap), function(node) {
	      solveNode(node, nodeMap);
	    });

	    setXLocationOfNodes();

	    setValuesOnOutputNodes();

	    setInitialGateTypes();

	    determineCurrentObjective();

	    setOutputStatesForCurrentObjective();

	    pen.drawMapOfNodes(nodeMap, currentObjective);
	  }

	  // Compares the new state to the current one and updates
	  this.update = function(state) {
	    console.log(state);
	    currentState = state;

	    _.each(state.gateTypes, function(type, key) {
	      if (nodeMap[key].gateType != type) {
	        console.log("The state of node "+key+" has changed from "+nodeMap[key].gateType+" to "+type);
	        nodeMap[key].gateType = type;
	      }
	    });

	    pen.clear();

	    determineCurrentObjective();
	    setOutputStatesForCurrentObjective();
	    pen.drawMapOfNodes(nodeMap, currentObjective);
	  }

	// Private helper functions

	  // Must be done before map is completed.
	  var setValuesOnInputNodes = function() {
	    var inputNodes = mapUtility.getInputNodes(nodeMap);

	    var yInterval = canvas.height/(inputNodes.length+2);

	    for(var i = 0; i < inputNodes.length; i++) {
	      var node = inputNodes[i];
	      node.state = true;
	      node.layer = 1;
	      node.metaScore = 1;
	      node.y = yInterval*(i+1);
	      nodeMap[node.id] = node;
	    }
	  }

	  // Can't be done until the map has been completed.
	  var setValuesOnOutputNodes = function() {
	    var outputNodes = mapUtility.getOutputNodes(nodeMap);
	    var xPosition = 0;
	    _.each(outputNodes, function(node) {
	      xPosition = (node.x > xPosition) ? node.x : xPosition;
	    });

	    var yInterval = canvas.height/(outputNodes.length+1);

	    // Set y to be the same as the input
	    for (var i = 0; i < outputNodes.length; i++) {
	      outputNodes[i].x = xPosition;
	      var myInputID = outputNodes[i].ins[0];
	      outputNodes[i].y = nodeMap[myInputID].y
	      nodeMap[outputNodes[i].id] = outputNodes[i];
	    }
	  }

	  // This must be done after solving the map, but before setting the output nodes.
	  var setXLocationOfNodes = function() {
	    var xInterval = canvas.width/(mapUtility.getHighestLayer(nodeMap)+2);

	    _.each(nodeMap, function(node) {
	      node.x = node.layer*xInterval;
	      nodeMap[node.id] = node;
	    });
	  }

	  var solveNode = function(currentNode) {
	    // base cases - input or already solved
	    if (currentNode.layer != undefined) {
	      return currentNode;
	    }

	    // Find inputs to this node.
	    _.each(currentNode.ins, function(nodeID) {
	      var inputNode = solveNode(nodeMap[nodeID]);

	      currentNode.y = (currentNode.y) ? currentNode.y + (inputNode.y/2) : inputNode.y/2;

	      currentNode.layer = (currentNode.layer) ? currentNode.layer : 0;
	      currentNode.layer = (inputNode.layer > currentNode.layer) ? inputNode.layer : currentNode.layer;

	      currentNode.metaScore  = (currentNode.metaScore) ? (currentNode.metaScore + inputNode.metaScore) : inputNode.metaScore;
	    });

	    currentNode.metaScore++;
	    currentNode.layer++;

	    nodeMap[currentNode.id] = currentNode;
	    return currentNode;
	  }

	  var setInitialGateTypes = function() {
	    _.each(initialScene.initialGateTypes, function(gate, key) {
	      nodeMap[key].gateType = gate;
	      console.log("Set gate @ "+key+" with type "+gate);
	    });
	  }

	//_____________________________________________________________________MapUtility
	  var mapUtility = {
	    getNodesByID : function(nodeMap, ids) {
	      var nodeInputs = [];
	      _.each(nodeIDs, function(nodeID) {
	        var node = nodeMap[nodeID];
	        if (node) {
	          nodeInputs.push(node);
	        }
	      });
	      return nodeInputs;
	    },

	    getInputNodes : function(nodeMap) {
	      var inputNodes = [];
	      
	      _.each(nodeMap, function(node) {
	        if (node.ins.length === 0) {
	          inputNodes.push(node);
	        }
	      });
	      return inputNodes;
	    },

	    getOutputNodes : function(nodeMap) {
	      var outputNodes = [];
	      
	      _.each(nodeMap, function(node) {
	        if (node.outs.length === 0) {
	          outputNodes.push(node);
	        }
	      });
	      return outputNodes;
	    },

	    mapByID : function(array) {
	      var nodeMap = {};
	      _.each(array, function(node) {
	        nodeMap[node.id] = node;
	      })
	      return nodeMap;
	    },

	    getHighestLayer : function(nodeMap) {
	      var highestLayer = 0;
	      _.each(nodeMap, function(inputNode) {
	        highestLayer = (inputNode.layer > highestLayer) ? inputNode.layer : highestLayer;
	      });
	      return highestLayer;
	    },

	    getNodeByCoord : function(nodeMap, x, y) {
	      var node;
	      var isWithinX;
	      var isWithinY;

	      _.each(nodeMap, function(currentNode) {
	        
	        isWithinX = (x > currentNode.x-10 && x < currentNode.x+10);
	        isWithinY = (y > currentNode.y-10 && y < currentNode.y+10);
	        
	        if (isWithinX && isWithinY) {
	          node = currentNode;
	        }

	      });

	      return node;
	    }
	  };

	  function createCanvas(containerId, width, height) {
	    var container = document.getElementById(containerId);
	    if (!container) {
	      throw 'Cannot find container with id ' + containerId;
	    }

	    canvas = document.createElement("canvas");
	    canvas.height = height;
	    canvas.width = width;
	    canvas.style.background = 'white';
	    container.appendChild(canvas);

	    HTMLCanvasElement.prototype.relMouseCoords = function(event) {
	      var posish = findPos(canvas);
	      var canvasX = event.pageX - posish.x;
	      var canvasY = event.pageY - posish.y;

	      return {x:canvasX, y:canvasY}
	    };

	    setCanvasOnClick();
	  };

	  function findPos(obj) {
	    var curleft = 0, curtop = 0;
	    if (obj.offsetParent) {
	        do {
	            curleft += obj.offsetLeft;
	            curtop += obj.offsetTop;
	        } while (obj = obj.offsetParent);
	        return { x: curleft, y: curtop };
	    }
	    return undefined;
	  }

	  function setCanvasOnClick() {
	    // There needs to be a recusive solve map for determining the output nodes state

	    canvas.addEventListener('click', function(event) {
	      coords = canvas.relMouseCoords(event);
	      console.log("Clicked at x: "+coords.x+" and y: "+coords.y);

	      var clickedNode = mapUtility.getNodeByCoord(nodeMap, coords.x, coords.y);
	      
	      // It's a gate
	      if (clickedNode && clickedNode.gateType) {
	        var improvedGate = _.findWhere(ImprovedGateType, {name: clickedNode.gateType});
	        changeGateTypeCallback(clickedNode.id, improvedGate.next.name);

	      // It's an input node.
	      } else if (clickedNode && initialScene.inputNodeIds.indexOf(clickedNode.id) != -1) {
	        nodeMap[clickedNode.id].state = !clickedNode.state;
	        
	        determineCurrentObjective();

	        setOutputStatesForCurrentObjective();

	        pen.clear();
	        pen.drawMapOfNodes(nodeMap, currentObjective);
	      }

	    }, false);
	  }

	  var determineCurrentObjective = function() {

	    _.each(currentState.objectives, function(objective, key) {
	      if (objectiveMatchesCurrentScene(objective)) {
	        currentObjective = objective;
	        console.log(currentObjective);
	      }
	    });
	  }

	  // This can def just return false instead of incramenting the counter
	  var objectiveMatchesCurrentScene = function(objective) {
	    var nonMatches = 0;

	    _.each(initialScene.inputNodeIds, function(id, key) {
	      if (nodeMap[id].state != objective.nodes[id]) {
	        nonMatches++;
	      }
	    })
	    return (nonMatches == 0);
	  }

	  var setOutputStatesForCurrentObjective = function() {
	    var outputNodes = mapUtility.getOutputNodes(nodeMap);

	    _.each(outputNodes, function(value) {
	      nodeMap[value.id].state = currentObjective.nodes[value.id];
	    });
	  }

	}

	module.exports = Visualizer;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(2);
	var GateType = __webpack_require__(5);

	var CanvasUtility = function(canvas) {
	  var self = this;
	  var context = canvas.getContext('2d');
	  var objective;

	  // Public methods
	  this.drawNode = function(node) {
	    drawGate(node);
	  };

	  this.connectNodes = function(node1, node2, currentObjective) {
	    if (node1.y != node2.y) {
	      multiLineWire(node1, node2, currentObjective);
	    } else {
	      singleLineWire(node1, node2, currentObjective);
	    }
	  };

	  this.drawMapOfNodes = function(nodeMap, currentObjective) {
	    objective = currentObjective;
	    _.each(nodeMap, function(node) {
	        var firstNode = node;
	        self.drawNode(node);

	        _.each(firstNode.outs, function(outID) {
	          var secondNode = nodeMap[outID];
	          self.connectNodes(firstNode, secondNode, currentObjective);
	        });

	      }); 
	  };

	  this.clear = function() {
	    context.beginPath();
	    context.clearRect(0, 0, canvas.width, canvas.height);
	  }

	  // Private methods
	  var singleLineWire = function(node1, node2) {
	    var target = (node1.x < node2.x) ? node2 : node1;
	    var start = (node1.x < node2.x) ? node1 : node2;

	    context.beginPath();
	    context.strokeStyle = (objective.nodes[start.id]) ? "#33CC33" : "#CC0000";
	    context.lineWidth = 6;
	    context.moveTo(node1.x+18, node1.y);
	    context.lineTo(node2.x-10, node2.y);
	    context.stroke();

	    context.beginPath();
	    context.moveTo(node1.x+18, node1.y);
	    context.lineTo(node2.x-10, node2.y);
	    context.strokeStyle = '#550000';
	    context.lineWidth = 2;
	    context.stroke();
	  };

	  var multiLineWire = function(node1, node2) {
	    var distanceBetween = Math.abs(node1.x - node2.x);
	    var target = (node1.x < node2.x) ? node2 : node1;
	    var start = (node1.x < node2.x) ? node1 : node2;

	    var isTargetLower = target.y > start.y;
	    var yTargetOffset = (isTargetLower) ? -5 : 5;
	    var xStartOffset = (start.ins.length == 0) ? -8 : 0;

	    if (target.outs.length == 0) {
	      yTargetOffset = 0;
	    }

	    context.beginPath();
	    context.moveTo(start.x+18 + xStartOffset , start.y);
	    context.lineTo(start.x+18 + xStartOffset + (distanceBetween/2), start.y);
	    context.lineTo(start.x+18 + xStartOffset + (distanceBetween/2) , target.y+yTargetOffset);
	    context.lineTo(target.x-10 , target.y+yTargetOffset);
	    context.strokeStyle = (objective.nodes[start.id]) ? "#33CC33" : "#CC0000";
	    context.lineWidth = 6;
	    context.stroke();

	    context.beginPath();
	    context.moveTo(start.x+18 + xStartOffset , start.y);
	    context.lineTo(start.x+18 + xStartOffset + (distanceBetween/2), start.y);
	    context.lineTo(start.x+18 + xStartOffset + (distanceBetween/2) , target.y+yTargetOffset);
	    context.lineTo(target.x-10 , target.y+yTargetOffset);
	    context.strokeStyle = '#550000';
	    context.lineWidth = 2;
	    context.stroke();
	  };

	// Nodes all have the same base dimensions
	// Front Assesories: Not Symbol -or- Exit Wire
	// Rear Assesories: Exclusive Symbol
	  function drawStateNode(node) {
	    var gateColor = (node.state) ? "#33CC33" : "#CC0000";

	    context.beginPath();
	    context.arc(node.x, node.y, 10, 0, 2*Math.PI);
	    context.fillStyle = gateColor;
	    context.fill();
	    context.closePath();
	  }

	  function drawAnd(node) {
	    context.beginPath();
	    context.strokeStyle = '#550000';
	    context.lineWidth = 2;
	    context.moveTo(node.x, node.y+10);
	    context.lineTo(node.x-10, node.y+10);
	    context.lineTo(node.x-10, node.y-10);
	    context.lineTo(node.x, node.y-10);
	    context.stroke();

	    context.beginPath();
	    context.strokeStyle = '#550000';
	    context.lineWidth = 2;
	    context.arc(node.x, node.y, 10, Math.PI*1.5, Math.PI*.5, false);
	    context.stroke();
	  }

	  function drawOr(node) {
	    // ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
	    context.beginPath();
	    context.strokeStyle = '#550000';
	    context.lineWidth = 2;
	    context.ellipse(node.x-15, node.y, 25, 10, 0, Math.PI*1.5, Math.PI*.5, false);
	    context.stroke();

	    context.beginPath();
	    context.strokeStyle = '#550000';
	    context.lineWidth = 2;
	    context.ellipse(node.x-15, node.y, 5, 10, 0, Math.PI*1.5, Math.PI*.5, false);
	    context.stroke();
	  }

	  function drawNand(node) {
	    drawAnd(node);
	    drawNot(node);
	  }

	  function drawNor(node) {
	    drawOr(node);
	    drawNot(node);
	  }

	  function drawXor(node) {
	    drawOr(node);
	    drawNot(node);
	  }

	  function drawXnor(node) {
	    drawOr(node);
	    drawExclusive(node);
	    drawNot(node);
	  }

	//_________________________________________________________________________________________Accessories
	  function drawNot(node) {
	    context.beginPath();
	    context.strokeStyle = '#550000';
	    context.lineWidth = 2;
	    context.arc(node.x+14, node.y, 4, 0, Math.PI*2, false);
	    context.stroke();
	  }

	  function drawExclusive(node) {
	    context.beginPath();
	    context.strokeStyle = '#550000';
	    context.lineWidth = 2;
	    context.ellipse(node.x-19, node.y, 4, 10, 0, Math.PI*1.5, Math.PI*.5, false);
	    context.stroke();
	  }

	  function drawExitWire(node) {
	    context.beginPath();
	    context.strokeStyle = (objective.nodes[node.id]) ? "#33CC33" : "#CC0000";
	    context.lineWidth = 6;
	    context.moveTo(node.x+10, node.y);
	    context.lineTo(node.x+18, node.y);
	    context.stroke();

	    context.beginPath();
	    context.strokeStyle = '#550000';
	    context.lineWidth = 2;
	    context.moveTo(node.x+10, node.y);
	    context.lineTo(node.x+18, node.y);
	    context.stroke();
	  }

	  var drawGate = function(node) {
	    switch (node.gateType) {
	      case GateType.AND:
	        drawAnd(node);
	        drawExitWire(node);
	        break;

	      case GateType.OR:
	        drawOr(node);
	        drawExitWire(node);
	        break;

	      case GateType.NAND:
	        drawAnd(node);
	        drawNot(node);
	        break;

	      case GateType.NOR:
	        drawOr(node);
	        drawNot(node);
	        break;

	      case GateType.XOR:
	        drawOr(node);
	        drawExclusive(node);
	        drawExitWire(node);
	        break;

	      case GateType.XNOR:
	        drawOr(node);
	        drawExclusive(node);
	        drawNot(node);
	        break;

	      case "" || undefined:
	        drawStateNode(node);
	        break;

	      default:
	        console.log("OH GAWD!!! IT WASN'T A GATE TYPE!!!");
	    }
	  };
	}

	module.exports = CanvasUtility;

/***/ },
/* 5 */
/***/ function(module, exports) {

	/**
	 * GateType Enum.
	 */

	module.exports = Object.freeze({
	  AND: 'GATETYPE_AND',
	  OR: 'GATETYPE_OR',
	  NAND: 'GATETYPE_NAND',
	  NOR: 'GATETYPE_NOR',
	  XOR: 'GATETYPE_XOR',
	  XNOR: 'GATETYPE_XNOR'
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Performs operations pertaining to game state.
	 */

	var _ = __webpack_require__(2);
	var GateLogic = __webpack_require__(7);

	function computeNodeStates(nodes, inputNodeIds, outputNodeIds, gateTypes, inputNodeStates) {
	  var nodeStates = {};

	  function computeNodeState(node) {
	    var id = node.id;

	    if (nodeStates[id] !== undefined) { // node state has been calculated before
	      return nodeStates[id];
	    }
	    if (_.contains(inputNodeIds, id)) { // input node, state is in objective
	      return inputNodeStates[id];
	    }
	    if (_.contains(outputNodeIds, id)) { // output node, state comes from sole in node (recursive)
	      return computeNodeState(nodes[node.ins[0]]);
	    }
	    // gate node, return logical combination of all inputs according to gate type (recursive)
	    var gateType = gateTypes[id];
	    var inNodes = _.filter(nodes, function(potentialInNode) {
	      return _.contains(node.ins, potentialInNode.id);
	    });
	    var inNodeStates = _.map(inNodes, function(inNode) {
	      return computeNodeState(inNode);
	    });
	    return GateLogic(inNodeStates, gateType);
	  }

	  _.each(nodes, function(node, nodeId) {
	    var nodeState = computeNodeState(node);
	    nodeStates[nodeId] = nodeState;
	  });

	  return nodeStates;
	}

	function computeObjectiveState(scene, gateTypes, objective) {
	  var objectiveState = {};

	  objectiveState.nodes = computeNodeStates(scene.nodes, scene.inputNodeIds,
	    scene.outputNodeIds, gateTypes, objective.inputNodeStates);

	  objectiveState.outputNodeSatisfaction = {};
	  _.each(scene.outputNodeIds, function(outputNodeId) {
	    var outputNodeIsSatisfied = objectiveState.nodes[outputNodeId] === objective.outputNodeStates[outputNodeId];
	    objectiveState.outputNodeSatisfaction[outputNodeId] = outputNodeIsSatisfied;
	  });

	  objectiveState.satisfied = !_.contains(_.values(objectiveState.outputNodeSatisfaction), false);

	  return objectiveState;
	}

	var StateManager = {
	  computeState: function(scene, gateTypes) {
	    if (gateTypes === undefined) {
	      gateTypes = scene.initialGateTypes;
	    }

	    var objectiveStates = {};

	    _.each(scene.objectives, function(objective, objectiveId) {
	      var objectiveState = computeObjectiveState(scene, gateTypes, objective);
	      objectiveStates[objectiveId] = objectiveState;
	    });

	    var playerHasWon = !_.contains(_.pluck(_.values(objectiveStates), 'satisfied'), false);

	    return {
	      gateTypes: gateTypes,
	      objectives: objectiveStates,
	      playerHasWon: playerHasWon
	    }
	  }
	};

	module.exports = StateManager;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Performs boolean logic on an array of booleans according to input GateType.
	 */

	var _ = __webpack_require__(2);
	var GateType = __webpack_require__(5);

	function and(booleans) {
	  return !_.contains(booleans, false);
	}

	function or(booleans) {
	  return _.contains(booleans, true);
	}

	function xor(booleans) {
	  return _.filter(booleans, function(boolean) {
	    return boolean;
	  }).length === 1;
	}

	var GateLogic = function(booleans, gateType) {

	  // check boolean array
	  if (!_.isArray(booleans)) {
	    throw 'booleans input is not array.';
	  }
	  if (booleans.length === 0) {
	    throw 'booleans input is empty.';
	  }
	  if (booleans.length === 1) {
	    throw 'booleans input only has one element: ' + booleans[0];
	  }

	  // check boolean types
	  var nonBooleans = _.filter(booleans, function(boolean) {
	    return !_.isBoolean(boolean);
	  });
	  if (nonBooleans.length > 0) {
	    throw 'non-booleans found: ' + nonBooleans.toString();
	  }
	  
	  switch (gateType) {
	    case GateType.AND:
	      return and(booleans);
	      break;
	    case GateType.OR:
	      return or(booleans);
	      break;
	    case GateType.NAND:
	      return !and(booleans);
	      break;
	    case GateType.NOR:
	      return !or(booleans);
	      break;
	    case GateType.XOR:
	      return xor(booleans);
	      break;
	    case GateType.XNOR:
	      return !xor(booleans);
	        break;
	    default:
	      throw 'invalid gateType: ' + gateType;
	  }
	};

	module.exports = GateLogic;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Generates random game scenes.
	 */

	var SceneGenerator = {
	  generate: function() {
	    throw 'not implemented yet'; // TODO implement this
	  }
	};

	module.exports = SceneGenerator;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Premade scenes, as opposed to randomly generated scenes.
	 * Higher indices means more difficult.
	 */

	var GateType = __webpack_require__(5);

	var PremadeScenes = {
	  0: {
	    nodes: {
	      0: {id: 0, ins: [], outs: [2]},
	      1: {id: 1, ins: [], outs: [2]},
	      2: {id: 2, ins: [0, 1], outs: [3]},
	      3: {id: 3, ins: [2], outs: []}
	    },
	    objectives: {
	      0: {
	        inputNodeStates: {0: false, 1: false},
	        outputNodeStates: {3: false}
	      },
	      1: {
	        inputNodeStates: {0: false, 1: true},
	        outputNodeStates: {3: false}
	      },
	      2: {
	        inputNodeStates: {0: true, 1: false},
	        outputNodeStates: {3: false}
	      },
	      3: {
	        inputNodeStates: {0: true, 1: true},
	        outputNodeStates: {3: true}
	      }
	    },
	    initialGateTypes: {
	      2: GateType.OR // AND
	    },
	    inputNodeIds: [0, 1],
	    gateNodeIds: [2],
	    outputNodeIds: [3]
	  },
	  1: {
	    nodes: {
	      0: {id: 0, ins: [], outs: [3]},
	      1: {id: 1, ins: [], outs: [3]},
	      2: {id: 2, ins: [], outs: [4]},
	      3: {id: 3, ins: [0, 1], outs: [4]},
	      4: {id: 4, ins: [2, 3], outs: [5]},
	      5: {id: 5, ins: [4], outs: []}
	    },
	    objectives: {
	      0: {
	        inputNodeStates: {0: false, 1: false, 2: false},
	        outputNodeStates: {5: true}
	      },
	      1: {
	        inputNodeStates: {0: false, 1: false, 2: true},
	        outputNodeStates: {5: true}
	      },
	      2: {
	        inputNodeStates: {0: false, 1: true, 2: false},
	        outputNodeStates: {5: true}
	      },
	      3: {
	        inputNodeStates: {0: false, 1: true, 2: true},
	        outputNodeStates: {5: false}
	      },
	      4: {
	        inputNodeStates: {0: true, 1: false, 2: false},
	        outputNodeStates: {5: true}
	      },
	      5: {
	        inputNodeStates: {0: true, 1: false, 2: true},
	        outputNodeStates: {5: false}
	      },
	      6: {
	        inputNodeStates: {0: true, 1: true, 2: false},
	        outputNodeStates: {5: true}
	      },
	      7: {
	        inputNodeStates: {0: true, 1: true, 2: true},
	        outputNodeStates: {5: true}
	      }
	    },
	    initialGateTypes: {
	      3: GateType.NOR, // XOR
	      4: GateType.XNOR // NAND
	    },
	    inputNodeIds: [0, 1, 2],
	    gateNodeIds: [3, 4],
	    outputNodeIds: [5]
	  },
	  2: {
	    nodes: {
	      0: {id: 0, ins: [], outs: [3]},
	      1: {id: 1, ins: [], outs: [3]},
	      2: {id: 2, ins: [], outs: [4]},
	      3: {id: 3, ins: [0, 1], outs: [4, 5]},
	      4: {id: 4, ins: [2, 3], outs: [6]},
	      5: {id: 5, ins: [3], outs: []},
	      6: {id: 6, ins: [4], outs: []}
	    },
	    objectives: {
	      0: {
	        inputNodeStates: {0: false, 1: false, 2: false},
	        outputNodeStates: {5: true, 6: false}
	      },
	      1: {
	        inputNodeStates: {0: false, 1: false, 2: true},
	        outputNodeStates: {5: true, 6: true}
	      },
	      2: {
	        inputNodeStates: {0: false, 1: true, 2: false},
	        outputNodeStates: {5: false, 6: false}
	      },
	      3: {
	        inputNodeStates: {0: false, 1: true, 2: true},
	        outputNodeStates: {5: false, 6: false}
	      },
	      4: {
	        inputNodeStates: {0: true, 1: false, 2: false},
	        outputNodeStates: {5: false, 6: false}
	      },
	      5: {
	        inputNodeStates: {0: true, 1: false, 2: true},
	        outputNodeStates: {5: false, 6: false}
	      },
	      6: {
	        inputNodeStates: {0: true, 1: true, 2: false},
	        outputNodeStates: {5: false, 6: false}
	      },
	      7: {
	        inputNodeStates: {0: true, 1: true, 2: true},
	        outputNodeStates: {5: false, 6: false}
	      }
	    },
	    initialGateTypes: {
	      3: GateType.OR, // NOR
	      4: GateType.NAND // AND
	    },
	    inputNodeIds: [0, 1, 2],
	    gateNodeIds: [3, 4],
	    outputNodeIds: [5, 6]
	  }
	};

	module.exports = PremadeScenes;


/***/ }
/******/ ]);