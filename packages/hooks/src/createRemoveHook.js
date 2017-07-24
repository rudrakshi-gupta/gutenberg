/**
 * Returns a function which, when invoked, will remove a specified hook or all
 * hooks by the given name.
 *
 * @param  {Object}   hooks      Stored hooks, keyed by hook name.
 * @param  {bool}     removeAll  Whether to remove all hooked callbacks.
 *
 * @return {Function}            Function that removes hooks.
 */
function createRemoveHook( hooks, removeAll ) {
	/**
	 * Removes the specified callback (or all callbacks) from the hook with a
	 * given name.
	 *
	 * @param {string}    hookName The name of the hook to modify.
	 * @param {?Function} callback The specific callback to be removed.  If
	 *                             omitted (and `removeAll` is truthy), clears
	 *                             all callbacks.
	 *
	 * @return {number}            The number of callbacks removed.
	 */
	return function removeHook( hookName, callback ) {
		if ( ! removeAll && typeof callback !== 'function' ) {
			console.error( 'The hook callback to remove must be a function.' );
			return;
		}

		// Bail if no hooks exist by this name
		if ( ! hooks.hasOwnProperty( hookName ) ) {
			return 0;
		}

		let handlersRemoved = 0;

		if ( removeAll ) {
			handlersRemoved = hooks[ hookName ].handlers.length;
			hooks[ hookName ] = {
				runs: hooks[ hookName ].runs,
				handlers: [],
			};
		} else {
			// Try to find the specified callback to remove.
			const handlers = hooks[ hookName ].handlers;
			for ( let i = handlers.length - 1; i >= 0; i-- ) {
				if ( handlers[ i ].callback === callback ) {
					handlers.splice( i, 1 );
					handlersRemoved++;
				}
			}
		}

		return handlersRemoved;
	};
}

export default createRemoveHook;
