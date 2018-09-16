/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "f8e042f4b3b8ffc840a3";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?1000":
/*!**********************************!*\
  !*** (webpack)/hot/poll.js?1000 ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + (err.stack || err.message));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\n\t\t\t\t\t\t\t\"warning\",\n\t\t\t\t\t\t\t\"[HMR] Update failed: \" + (err.stack || err.message)\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?1000\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./src/app.controller.ts":
/*!*******************************!*\
  !*** ./src/app.controller.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst app_service_1 = __webpack_require__(/*! ./app.service */ \"./src/app.service.ts\");\nlet AppController = class AppController {\n    constructor(appService) {\n        this.appService = appService;\n    }\n    root() {\n        return this.appService.root();\n    }\n};\n__decorate([\n    common_1.Get(),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", []),\n    __metadata(\"design:returntype\", String)\n], AppController.prototype, \"root\", null);\nAppController = __decorate([\n    common_1.Controller(),\n    __metadata(\"design:paramtypes\", [app_service_1.AppService])\n], AppController);\nexports.AppController = AppController;\n\n\n//# sourceURL=webpack:///./src/app.controller.ts?");

/***/ }),

/***/ "./src/app.module.ts":
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst app_controller_1 = __webpack_require__(/*! ./app.controller */ \"./src/app.controller.ts\");\nconst qiniu_module_1 = __webpack_require__(/*! ./qiniu/qiniu.module */ \"./src/qiniu/qiniu.module.ts\");\nconst app_service_1 = __webpack_require__(/*! ./app.service */ \"./src/app.service.ts\");\nlet AppModule = class AppModule {\n};\nAppModule = __decorate([\n    common_1.Module({\n        imports: [typeorm_1.TypeOrmModule.forRoot(), qiniu_module_1.QiniuModule],\n        controllers: [app_controller_1.AppController],\n        providers: [app_service_1.AppService],\n    })\n], AppModule);\nexports.AppModule = AppModule;\n\n\n//# sourceURL=webpack:///./src/app.module.ts?");

/***/ }),

/***/ "./src/app.service.ts":
/*!****************************!*\
  !*** ./src/app.service.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet AppService = class AppService {\n    root() {\n        return 'Hello World!';\n    }\n};\nAppService = __decorate([\n    common_1.Injectable()\n], AppService);\nexports.AppService = AppService;\n\n\n//# sourceURL=webpack:///./src/app.service.ts?");

/***/ }),

/***/ "./src/common/config/qiniu-bucket.json":
/*!*********************************************!*\
  !*** ./src/common/config/qiniu-bucket.json ***!
  \*********************************************/
/*! exports provided: getUri, postUri, default */
/***/ (function(module) {

eval("module.exports = {\"getUri\":\"https://rs.qbox.me/buckets\",\"postUri\":\"https://rs.qiniu.com\"};\n\n//# sourceURL=webpack:///./src/common/config/qiniu-bucket.json?");

/***/ }),

/***/ "./src/common/config/qiniu-key.json":
/*!******************************************!*\
  !*** ./src/common/config/qiniu-key.json ***!
  \******************************************/
/*! exports provided: secretKey, accessKey, default */
/***/ (function(module) {

eval("module.exports = {\"secretKey\":\"gohLJusvDqZcwwYaL_DcF-KeTDX65zDdEzaEyayP\",\"accessKey\":\"KgNS98Sj66CuXFi64xNHs11vfrO8iXmX8Zcht-Id\"};\n\n//# sourceURL=webpack:///./src/common/config/qiniu-key.json?");

/***/ }),

/***/ "./src/common/decorators/access-token.decorator.ts":
/*!*********************************************************!*\
  !*** ./src/common/decorators/access-token.decorator.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst qiniu = __webpack_require__(/*! qiniu */ \"qiniu\");\nconst data = __webpack_require__(/*! ../config/qiniu-key.json */ \"./src/common/config/qiniu-key.json\");\nexports.getAccessToken = (uri) => qiniu.util.generateAccessToken(data, uri);\nexports.AccessToken = common_1.createParamDecorator(uri => exports.getAccessToken(uri));\n\n\n//# sourceURL=webpack:///./src/common/decorators/access-token.decorator.ts?");

/***/ }),

/***/ "./src/common/middlewares/logger.middleware.ts":
/*!*****************************************************!*\
  !*** ./src/common/middlewares/logger.middleware.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet LoggerMiddleware = class LoggerMiddleware {\n    resolve(name) {\n        return (req, res, next) => {\n            console.log(`[${name}]Request ....`);\n            next();\n        };\n    }\n};\nLoggerMiddleware = __decorate([\n    common_1.Injectable()\n], LoggerMiddleware);\nexports.LoggerMiddleware = LoggerMiddleware;\n\n\n//# sourceURL=webpack:///./src/common/middlewares/logger.middleware.ts?");

/***/ }),

/***/ "./src/common/pipes/validation.pipe.ts":
/*!*********************************************!*\
  !*** ./src/common/pipes/validation.pipe.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst class_transformer_1 = __webpack_require__(/*! class-transformer */ \"class-transformer\");\nlet ValidationPipe = class ValidationPipe {\n    transform(value, metadata) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { metatype } = metadata;\n            if (!metatype || !this.toValidate(metatype)) {\n                return value;\n            }\n            const object = class_transformer_1.plainToClass(metatype, value);\n            const errors = yield class_validator_1.validate(object);\n            if (errors.length > 0) {\n                throw new common_1.BadRequestException('请求参数体不完整');\n            }\n            return value;\n        });\n    }\n    toValidate(metatype) {\n        const types = [String, Boolean, Number, Array, Object];\n        return !types.find(type => metatype === type);\n    }\n};\nValidationPipe = __decorate([\n    common_1.Injectable()\n], ValidationPipe);\nexports.ValidationPipe = ValidationPipe;\n\n\n//# sourceURL=webpack:///./src/common/pipes/validation.pipe.ts?");

/***/ }),

/***/ "./src/common/util/base64-url.ts":
/*!***************************************!*\
  !*** ./src/common/util/base64-url.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction encode(str, code = 'base64') {\n    const buff = new Buffer(str);\n    const encodeStr = buff.toString(code);\n    return encodeStr;\n}\nexports.encode = encode;\nfunction decode(str, formCode = 'base64', toCode = 'ascii') {\n    const buff = new Buffer(str, formCode);\n    const decodeStr = buff.toString(toCode);\n    return decodeStr;\n}\nexports.decode = decode;\n\n\n//# sourceURL=webpack:///./src/common/util/base64-url.ts?");

/***/ }),

/***/ "./src/common/util/pagination.ts":
/*!***************************************!*\
  !*** ./src/common/util/pagination.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction pagination(page, size) {\n    const _page = +page;\n    const _size = +size;\n    const limit = _size;\n    const offset = (_page - 1) * limit;\n    return { offset, limit };\n}\nexports.pagination = pagination;\n\n\n//# sourceURL=webpack:///./src/common/util/pagination.ts?");

/***/ }),

/***/ "./src/common/util/qiniu.ts":
/*!**********************************!*\
  !*** ./src/common/util/qiniu.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\n            t[p[i]] = s[p[i]];\n    return t;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst qiniu = __webpack_require__(/*! qiniu */ \"qiniu\");\nconst data = __webpack_require__(/*! ../config/qiniu-key.json */ \"./src/common/config/qiniu-key.json\");\nconst streamifier_1 = __webpack_require__(/*! ./streamifier */ \"./src/common/util/streamifier.ts\");\nconst { accessKey, secretKey } = data;\nfunction responseHandler(resolve, reject, { respErr, respBody, respInfo }) {\n    if (respErr) {\n        reject(respErr);\n    }\n    else if (respInfo.statusCode !== 200) {\n        const err = new Error();\n        err.message = `${respInfo.statusCode} error`;\n        reject(err);\n    }\n    else {\n        resolve(respBody);\n    }\n}\nclass Qiniu {\n    constructor() { }\n    mac() {\n        return new qiniu.auth.digest.Mac(accessKey, secretKey);\n    }\n    config() {\n        const config = new qiniu.conf.Config();\n        return config;\n    }\n    bucketManager() {\n        const bucketManager = new qiniu.rs.BucketManager(this.mac(), this.config());\n        return bucketManager;\n    }\n    uploadToken(options) {\n        const defaultOptions = {\n            scope: '',\n            expires: 7200,\n            returnBody: '{\"name\":\"$(key)\",\"hash\":\"$(etag)\",\"size\":$(fsize),\"bucket\":\"$(bucket)\"}',\n        };\n        const mac = this.mac();\n        const putPolicy = new qiniu.rs.PutPolicy(Object.assign({}, defaultOptions, options));\n        const uploadToken = putPolicy.uploadToken(mac);\n        return uploadToken;\n    }\n    uploadFile(bucket, file) {\n        const { buffer, originalname } = file;\n        const config = this.config();\n        const uploadToken = this.uploadToken({ scope: bucket });\n        const formUploader = new qiniu.form_up.FormUploader(config);\n        const putExtra = new qiniu.form_up.PutExtra();\n        const readstream = streamifier_1.streamifier.createReadStream(buffer);\n        const encodeFileName = encodeURI(originalname);\n        return new Promise((resolve, reject) => {\n            formUploader.putStream(uploadToken, encodeFileName, readstream, putExtra, (respErr, respBody, respInfo) => responseHandler(resolve, reject, { respErr, respBody, respInfo }));\n        });\n    }\n    getFiles(opts) {\n        const bucketManager = this.bucketManager();\n        const { bucket } = opts, otherProps = __rest(opts, [\"bucket\"]);\n        return new Promise((resolve, reject) => {\n            bucketManager.listPrefix(bucket, otherProps, (respErr, respBody, respInfo) => responseHandler(resolve, reject, { respErr, respBody, respInfo }));\n        });\n    }\n    deleteFile(name, bucket) {\n        const bucketManager = this.bucketManager();\n        return new Promise((resolve, reject) => {\n            bucketManager.delete(bucket, name, (respErr, respBody, respInfo) => responseHandler(resolve, reject, { respErr, respBody, respInfo }));\n        });\n    }\n}\nexports.default = Qiniu;\n\n\n//# sourceURL=webpack:///./src/common/util/qiniu.ts?");

/***/ }),

/***/ "./src/common/util/streamifier.ts":
/*!****************************************!*\
  !*** ./src/common/util/streamifier.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst util = __webpack_require__(/*! util */ \"util\");\nconst stream = __webpack_require__(/*! stream */ \"stream\");\nconst MultiStream = function (object, options) {\n    if (object instanceof Buffer || typeof object === 'string') {\n        options = options || {};\n        stream.Readable.call(this, {\n            highWaterMark: options.highWaterMark,\n            encoding: options.encoding,\n        });\n    }\n    else {\n        stream.Readable.call(this, { objectMode: true });\n    }\n    this._object = object;\n};\nMultiStream.prototype._read = function () {\n    this.push(this._object);\n    this._object = null;\n};\nutil.inherits(MultiStream, stream.Readable);\nexports.streamifier = {\n    createReadStream(object, options = {}) {\n        return new MultiStream(object, options);\n    },\n};\n\n\n//# sourceURL=webpack:///./src/common/util/streamifier.ts?");

/***/ }),

/***/ "./src/main.hmr.ts":
/*!*************************!*\
  !*** ./src/main.hmr.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst core_1 = __webpack_require__(/*! @nestjs/core */ \"@nestjs/core\");\nconst app_module_1 = __webpack_require__(/*! ./app.module */ \"./src/app.module.ts\");\nfunction bootstrap() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const app = yield core_1.NestFactory.create(app_module_1.AppModule);\n        yield app.listen(3000);\n        if (true) {\n            module.hot.accept();\n            module.hot.dispose(() => app.close());\n        }\n    });\n}\nbootstrap();\n\n\n//# sourceURL=webpack:///./src/main.hmr.ts?");

/***/ }),

/***/ "./src/qiniu/bucket/bucket.controller.ts":
/*!***********************************************!*\
  !*** ./src/qiniu/bucket/bucket.controller.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst url = __webpack_require__(/*! url */ \"url\");\nconst bucket_service_1 = __webpack_require__(/*! ./bucket.service */ \"./src/qiniu/bucket/bucket.service.ts\");\nconst access_token_decorator_1 = __webpack_require__(/*! ../../common/decorators/access-token.decorator */ \"./src/common/decorators/access-token.decorator.ts\");\nconst bucket_interceptor_1 = __webpack_require__(/*! ./bucket.interceptor */ \"./src/qiniu/bucket/bucket.interceptor.ts\");\nconst bucket_dto_1 = __webpack_require__(/*! ./dto/bucket.dto */ \"./src/qiniu/bucket/dto/bucket.dto.ts\");\nconst validation_pipe_1 = __webpack_require__(/*! ../../common/pipes/validation.pipe */ \"./src/common/pipes/validation.pipe.ts\");\nconst base64_url_1 = __webpack_require__(/*! ../../common/util/base64-url */ \"./src/common/util/base64-url.ts\");\nconst config = __webpack_require__(/*! ../../common/config/qiniu-bucket.json */ \"./src/common/config/qiniu-bucket.json\");\nconst { getUri, postUri } = config;\nlet BucketController = class BucketController {\n    constructor(bucketService) {\n        this.bucketService = bucketService;\n    }\n    createOne(createBucket) {\n        const region = createBucket.region || 'z0';\n        const fullUri = url.resolve(postUri, `/mkbucketv2/${base64_url_1.encode(createBucket.name)}/region/${region}`);\n        const token = access_token_decorator_1.getAccessToken(fullUri);\n        return this.bucketService\n            .createOne(fullUri, token)\n            .toPromise()\n            .then(() => '');\n    }\n    findAll(token) {\n        return this.bucketService\n            .findAll(getUri, token)\n            .toPromise()\n            .then(({ data }) => data);\n    }\n    delete(params) {\n        const name = params.name;\n        const fullUri = url.resolve(postUri, `/drop/${name}`);\n        const token = access_token_decorator_1.getAccessToken(fullUri);\n        return this.bucketService\n            .delete(fullUri, token)\n            .toPromise()\n            .then(() => '');\n    }\n};\n__decorate([\n    common_1.Post(),\n    common_1.UsePipes(validation_pipe_1.ValidationPipe),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [bucket_dto_1.CreateBucketDto]),\n    __metadata(\"design:returntype\", void 0)\n], BucketController.prototype, \"createOne\", null);\n__decorate([\n    common_1.UseInterceptors(bucket_interceptor_1.BucketInterceptor),\n    common_1.Get(),\n    __param(0, access_token_decorator_1.AccessToken(getUri)),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String]),\n    __metadata(\"design:returntype\", void 0)\n], BucketController.prototype, \"findAll\", null);\n__decorate([\n    common_1.Delete(':name'),\n    common_1.HttpCode(204),\n    __param(0, common_1.Param()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [bucket_dto_1.DeleteBucketDto]),\n    __metadata(\"design:returntype\", void 0)\n], BucketController.prototype, \"delete\", null);\nBucketController = __decorate([\n    swagger_1.ApiUseTags('qiniu'),\n    common_1.Controller('qiniu/bucket'),\n    __metadata(\"design:paramtypes\", [bucket_service_1.BucketService])\n], BucketController);\nexports.BucketController = BucketController;\n\n\n//# sourceURL=webpack:///./src/qiniu/bucket/bucket.controller.ts?");

/***/ }),

/***/ "./src/qiniu/bucket/bucket.interceptor.ts":
/*!************************************************!*\
  !*** ./src/qiniu/bucket/bucket.interceptor.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst operators_1 = __webpack_require__(/*! rxjs/operators */ \"rxjs/operators\");\nlet BucketInterceptor = class BucketInterceptor {\n    intercept(context, call$) {\n        return call$.pipe(operators_1.map((data) => {\n            return data.reduce((arr, item, index) => {\n                arr.push({ name: item, id: index + 1 });\n                return arr;\n            }, []);\n        }));\n    }\n};\nBucketInterceptor = __decorate([\n    common_1.Injectable()\n], BucketInterceptor);\nexports.BucketInterceptor = BucketInterceptor;\n\n\n//# sourceURL=webpack:///./src/qiniu/bucket/bucket.interceptor.ts?");

/***/ }),

/***/ "./src/qiniu/bucket/bucket.module.ts":
/*!*******************************************!*\
  !*** ./src/qiniu/bucket/bucket.module.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst bucket_controller_1 = __webpack_require__(/*! ./bucket.controller */ \"./src/qiniu/bucket/bucket.controller.ts\");\nconst bucket_service_1 = __webpack_require__(/*! ./bucket.service */ \"./src/qiniu/bucket/bucket.service.ts\");\nconst logger_middleware_1 = __webpack_require__(/*! ../../common/middlewares/logger.middleware */ \"./src/common/middlewares/logger.middleware.ts\");\nlet BucketModule = class BucketModule {\n    configure(consumer) {\n        consumer\n            .apply(logger_middleware_1.LoggerMiddleware)\n            .with('BucketController')\n            .forRoutes(bucket_controller_1.BucketController);\n    }\n};\nBucketModule = __decorate([\n    common_1.Module({\n        imports: [common_1.HttpModule],\n        controllers: [bucket_controller_1.BucketController],\n        providers: [bucket_service_1.BucketService],\n    })\n], BucketModule);\nexports.BucketModule = BucketModule;\n\n\n//# sourceURL=webpack:///./src/qiniu/bucket/bucket.module.ts?");

/***/ }),

/***/ "./src/qiniu/bucket/bucket.service.ts":
/*!********************************************!*\
  !*** ./src/qiniu/bucket/bucket.service.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nlet BucketService = class BucketService {\n    constructor(httpService) {\n        this.httpService = httpService;\n    }\n    createOne(uri, token) {\n        return this.httpService.post(uri, {}, {\n            headers: {\n                authorization: token,\n            },\n        });\n    }\n    findAll(uri, token) {\n        return this.httpService.get(uri, {\n            headers: {\n                authorization: token,\n            },\n        });\n    }\n    delete(uri, token) {\n        return this.httpService.post(uri, {}, {\n            headers: {\n                authorization: token,\n            },\n        });\n    }\n};\nBucketService = __decorate([\n    common_1.Injectable(),\n    __metadata(\"design:paramtypes\", [common_1.HttpService])\n], BucketService);\nexports.BucketService = BucketService;\n\n\n//# sourceURL=webpack:///./src/qiniu/bucket/bucket.service.ts?");

/***/ }),

/***/ "./src/qiniu/bucket/dto/bucket.dto.ts":
/*!********************************************!*\
  !*** ./src/qiniu/bucket/dto/bucket.dto.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nclass CreateBucketDto {\n}\n__decorate([\n    swagger_1.ApiModelProperty(),\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], CreateBucketDto.prototype, \"name\", void 0);\n__decorate([\n    swagger_1.ApiModelProperty({\n        default: 'z0',\n        description: '存储区域,默认有(华东)z0、(华北)z1、(华南)z2、(北美)na0、(东南亚)as0',\n    }),\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], CreateBucketDto.prototype, \"region\", void 0);\nexports.CreateBucketDto = CreateBucketDto;\nclass DeleteBucketDto {\n}\n__decorate([\n    swagger_1.ApiModelProperty(),\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], DeleteBucketDto.prototype, \"name\", void 0);\nexports.DeleteBucketDto = DeleteBucketDto;\n\n\n//# sourceURL=webpack:///./src/qiniu/bucket/dto/bucket.dto.ts?");

/***/ }),

/***/ "./src/qiniu/file/dto/file.dto.ts":
/*!****************************************!*\
  !*** ./src/qiniu/file/dto/file.dto.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst class_validator_1 = __webpack_require__(/*! class-validator */ \"class-validator\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nclass GetFileDto {\n}\n__decorate([\n    swagger_1.ApiModelProperty({\n        description: '文件存储的镜像空间名',\n    }),\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], GetFileDto.prototype, \"bucket\", void 0);\n__decorate([\n    swagger_1.ApiModelProperty({\n        description: '页码',\n    }),\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", Number)\n], GetFileDto.prototype, \"page\", void 0);\n__decorate([\n    swagger_1.ApiModelProperty({\n        description: '页数',\n    }),\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", Number)\n], GetFileDto.prototype, \"size\", void 0);\nexports.GetFileDto = GetFileDto;\nclass PostFileDto {\n}\n__decorate([\n    swagger_1.ApiModelProperty(),\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], PostFileDto.prototype, \"bucket\", void 0);\nexports.PostFileDto = PostFileDto;\nclass DeleteFileDto {\n}\n__decorate([\n    swagger_1.ApiModelProperty(),\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], DeleteFileDto.prototype, \"name\", void 0);\n__decorate([\n    swagger_1.ApiModelProperty(),\n    class_validator_1.IsString(),\n    __metadata(\"design:type\", String)\n], DeleteFileDto.prototype, \"bucket\", void 0);\nexports.DeleteFileDto = DeleteFileDto;\n\n\n//# sourceURL=webpack:///./src/qiniu/file/dto/file.dto.ts?");

/***/ }),

/***/ "./src/qiniu/file/file.controller.ts":
/*!*******************************************!*\
  !*** ./src/qiniu/file/file.controller.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst swagger_1 = __webpack_require__(/*! @nestjs/swagger */ \"@nestjs/swagger\");\nconst file_service_1 = __webpack_require__(/*! ./file.service */ \"./src/qiniu/file/file.service.ts\");\nconst file_dto_1 = __webpack_require__(/*! ./dto/file.dto */ \"./src/qiniu/file/dto/file.dto.ts\");\nconst validation_pipe_1 = __webpack_require__(/*! ../../common/pipes/validation.pipe */ \"./src/common/pipes/validation.pipe.ts\");\nlet FileController = class FileController {\n    constructor(fileService) {\n        this.fileService = fileService;\n    }\n    postOne(body, file) {\n        const { bucket } = body;\n        return this.fileService.postOne(bucket, file);\n    }\n    getAll(query) {\n        return this.fileService.getAll(query);\n    }\n    deleteOne(body) {\n        const { name, bucket } = body;\n        return this.fileService.deleteOne(name, bucket);\n    }\n};\n__decorate([\n    common_1.Post(),\n    common_1.UseInterceptors(common_1.FileInterceptor('file')),\n    common_1.UsePipes(validation_pipe_1.ValidationPipe),\n    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [file_dto_1.PostFileDto, Object]),\n    __metadata(\"design:returntype\", void 0)\n], FileController.prototype, \"postOne\", null);\n__decorate([\n    common_1.Get(),\n    common_1.UsePipes(validation_pipe_1.ValidationPipe),\n    __param(0, common_1.Query()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [file_dto_1.GetFileDto]),\n    __metadata(\"design:returntype\", void 0)\n], FileController.prototype, \"getAll\", null);\n__decorate([\n    common_1.HttpCode(204),\n    common_1.Delete(),\n    common_1.UsePipes(validation_pipe_1.ValidationPipe),\n    __param(0, common_1.Body()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [file_dto_1.DeleteFileDto]),\n    __metadata(\"design:returntype\", void 0)\n], FileController.prototype, \"deleteOne\", null);\nFileController = __decorate([\n    swagger_1.ApiUseTags('qiniu'),\n    common_1.Controller('qiniu/file'),\n    __metadata(\"design:paramtypes\", [file_service_1.FileService])\n], FileController);\nexports.FileController = FileController;\n\n\n//# sourceURL=webpack:///./src/qiniu/file/file.controller.ts?");

/***/ }),

/***/ "./src/qiniu/file/file.entity.ts":
/*!***************************************!*\
  !*** ./src/qiniu/file/file.entity.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst typeorm_1 = __webpack_require__(/*! typeorm */ \"typeorm\");\nlet FileEntity = class FileEntity {\n};\n__decorate([\n    typeorm_1.PrimaryGeneratedColumn(),\n    __metadata(\"design:type\", Number)\n], FileEntity.prototype, \"id\", void 0);\n__decorate([\n    typeorm_1.Column({ length: 100 }),\n    __metadata(\"design:type\", String)\n], FileEntity.prototype, \"name\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", String)\n], FileEntity.prototype, \"hash\", void 0);\n__decorate([\n    typeorm_1.Column(),\n    __metadata(\"design:type\", Number)\n], FileEntity.prototype, \"size\", void 0);\n__decorate([\n    typeorm_1.Column({ length: 100 }),\n    __metadata(\"design:type\", String)\n], FileEntity.prototype, \"bucket\", void 0);\nFileEntity = __decorate([\n    typeorm_1.Entity()\n], FileEntity);\nexports.FileEntity = FileEntity;\n\n\n//# sourceURL=webpack:///./src/qiniu/file/file.entity.ts?");

/***/ }),

/***/ "./src/qiniu/file/file.module.ts":
/*!***************************************!*\
  !*** ./src/qiniu/file/file.module.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst logger_middleware_1 = __webpack_require__(/*! ../../common/middlewares/logger.middleware */ \"./src/common/middlewares/logger.middleware.ts\");\nconst file_controller_1 = __webpack_require__(/*! ./file.controller */ \"./src/qiniu/file/file.controller.ts\");\nconst file_service_1 = __webpack_require__(/*! ./file.service */ \"./src/qiniu/file/file.service.ts\");\nconst file_entity_1 = __webpack_require__(/*! ./file.entity */ \"./src/qiniu/file/file.entity.ts\");\nlet FileModule = class FileModule {\n    configure(consumer) {\n        consumer\n            .apply(logger_middleware_1.LoggerMiddleware)\n            .with('FileController')\n            .forRoutes(file_controller_1.FileController);\n    }\n};\nFileModule = __decorate([\n    common_1.Module({\n        imports: [typeorm_1.TypeOrmModule.forFeature([file_entity_1.FileEntity])],\n        controllers: [file_controller_1.FileController],\n        providers: [file_service_1.FileService],\n    })\n], FileModule);\nexports.FileModule = FileModule;\n\n\n//# sourceURL=webpack:///./src/qiniu/file/file.module.ts?");

/***/ }),

/***/ "./src/qiniu/file/file.service.ts":
/*!****************************************!*\
  !*** ./src/qiniu/file/file.service.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __metadata = (this && this.__metadata) || function (k, v) {\n    if (typeof Reflect === \"object\" && typeof Reflect.metadata === \"function\") return Reflect.metadata(k, v);\n};\nvar __param = (this && this.__param) || function (paramIndex, decorator) {\n    return function (target, key) { decorator(target, key, paramIndex); }\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\n            t[p[i]] = s[p[i]];\n    return t;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst typeorm_1 = __webpack_require__(/*! @nestjs/typeorm */ \"@nestjs/typeorm\");\nconst typeorm_2 = __webpack_require__(/*! typeorm */ \"typeorm\");\nconst file_entity_1 = __webpack_require__(/*! ./file.entity */ \"./src/qiniu/file/file.entity.ts\");\nconst qiniu_1 = __webpack_require__(/*! ../../common/util/qiniu */ \"./src/common/util/qiniu.ts\");\nconst pagination_1 = __webpack_require__(/*! ../../common/util/pagination */ \"./src/common/util/pagination.ts\");\nlet FileService = class FileService {\n    constructor(fileRepository) {\n        this.fileRepository = fileRepository;\n        this.qiniu = new qiniu_1.default();\n    }\n    postOne(bucket, file) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const fileJson = (respJson) => {\n                const { name } = respJson, restProps = __rest(respJson, [\"name\"]);\n                return Object.assign({ name: decodeURI(name) }, restProps);\n            };\n            return this.qiniu.uploadFile(bucket, file).then((data) => __awaiter(this, void 0, void 0, function* () {\n                const existData = yield this.fileRepository\n                    .createQueryBuilder('file')\n                    .where('file.hash = :hash', { hash: data.hash })\n                    .andWhere('file.bucket = :bucket', { bucket })\n                    .getOne();\n                if (!!existData) {\n                    return fileJson(existData);\n                }\n                yield this.fileRepository\n                    .createQueryBuilder('file')\n                    .insert()\n                    .values([data])\n                    .execute();\n                const result = yield this.fileRepository\n                    .createQueryBuilder('file')\n                    .where('file.hash = :hash', { hash: data.hash })\n                    .andWhere('file.bucket = :bucket', { bucket })\n                    .getOne();\n                return fileJson(result);\n            }));\n        });\n    }\n    getAll(query) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const { offset, limit } = pagination_1.pagination(query.page, query.size);\n            const [data, total] = yield this.fileRepository\n                .createQueryBuilder('file')\n                .where('file.bucket = :bucket', { bucket: query.bucket })\n                .skip(offset)\n                .take(limit)\n                .getManyAndCount();\n            return {\n                list: data,\n                totalCount: total,\n            };\n        });\n    }\n    deleteOne(name, bucket) {\n        return __awaiter(this, void 0, void 0, function* () {\n            return this.qiniu.deleteFile(name, bucket).then(() => __awaiter(this, void 0, void 0, function* () {\n                yield this.fileRepository\n                    .createQueryBuilder('file')\n                    .delete()\n                    .where('name = :name', { name })\n                    .execute();\n                return '';\n            }));\n        });\n    }\n};\n__decorate([\n    __param(1, common_1.UploadedFile()),\n    __metadata(\"design:type\", Function),\n    __metadata(\"design:paramtypes\", [String, Object]),\n    __metadata(\"design:returntype\", Promise)\n], FileService.prototype, \"postOne\", null);\nFileService = __decorate([\n    common_1.Injectable(),\n    __param(0, typeorm_1.InjectRepository(file_entity_1.FileEntity)),\n    __metadata(\"design:paramtypes\", [typeorm_2.Repository])\n], FileService);\nexports.FileService = FileService;\n\n\n//# sourceURL=webpack:///./src/qiniu/file/file.service.ts?");

/***/ }),

/***/ "./src/qiniu/qiniu.module.ts":
/*!***********************************!*\
  !*** ./src/qiniu/qiniu.module.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst common_1 = __webpack_require__(/*! @nestjs/common */ \"@nestjs/common\");\nconst bucket_module_1 = __webpack_require__(/*! ./bucket/bucket.module */ \"./src/qiniu/bucket/bucket.module.ts\");\nconst file_module_1 = __webpack_require__(/*! ./file/file.module */ \"./src/qiniu/file/file.module.ts\");\nlet QiniuModule = class QiniuModule {\n};\nQiniuModule = __decorate([\n    common_1.Module({\n        imports: [bucket_module_1.BucketModule, file_module_1.FileModule],\n        controllers: [],\n        providers: [],\n    })\n], QiniuModule);\nexports.QiniuModule = QiniuModule;\n\n\n//# sourceURL=webpack:///./src/qiniu/qiniu.module.ts?");

/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi webpack/hot/poll?1000 ./src/main.hmr.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?1000 */\"./node_modules/webpack/hot/poll.js?1000\");\nmodule.exports = __webpack_require__(/*! ./src/main.hmr.ts */\"./src/main.hmr.ts\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "@nestjs/common":
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/common\");\n\n//# sourceURL=webpack:///external_%22@nestjs/common%22?");

/***/ }),

/***/ "@nestjs/core":
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/core\");\n\n//# sourceURL=webpack:///external_%22@nestjs/core%22?");

/***/ }),

/***/ "@nestjs/swagger":
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/swagger\");\n\n//# sourceURL=webpack:///external_%22@nestjs/swagger%22?");

/***/ }),

/***/ "@nestjs/typeorm":
/*!**********************************!*\
  !*** external "@nestjs/typeorm" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@nestjs/typeorm\");\n\n//# sourceURL=webpack:///external_%22@nestjs/typeorm%22?");

/***/ }),

/***/ "class-transformer":
/*!************************************!*\
  !*** external "class-transformer" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"class-transformer\");\n\n//# sourceURL=webpack:///external_%22class-transformer%22?");

/***/ }),

/***/ "class-validator":
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"class-validator\");\n\n//# sourceURL=webpack:///external_%22class-validator%22?");

/***/ }),

/***/ "qiniu":
/*!************************!*\
  !*** external "qiniu" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"qiniu\");\n\n//# sourceURL=webpack:///external_%22qiniu%22?");

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rxjs/operators\");\n\n//# sourceURL=webpack:///external_%22rxjs/operators%22?");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"stream\");\n\n//# sourceURL=webpack:///external_%22stream%22?");

/***/ }),

/***/ "typeorm":
/*!**************************!*\
  !*** external "typeorm" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"typeorm\");\n\n//# sourceURL=webpack:///external_%22typeorm%22?");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"url\");\n\n//# sourceURL=webpack:///external_%22url%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ })

/******/ });