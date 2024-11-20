declare module '@ckeditor/ckeditor5-build-classic' {
	const ClassicEditorBuild: any;
	export = ClassicEditorBuild;
}
/*
 * Extra typings definitions
 */

// Allow .json files imports
declare module '*.json';

// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

// Map URL Filter Sanitizer
interface Map<K, V> {
  toSanitizedURLFilters(): string;
}

interface Map<K, V> {
  toJson(): string;
}


declare namespace _ {
}