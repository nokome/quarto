/*
 * services.ts
 *
 * Copyright (C) 2022 by Posit Software, PBC
 *
 * Unless you have received this program directly from Posit Software pursuant
 * to the terms of a commercial license agreement with Posit Software, then
 * this program is licensed to you under the terms of version 3 of the
 * GNU Affero General Public License. This program is distributed WITHOUT
 * ANY EXPRESS OR IMPLIED WARRANTY, INCLUDING THOSE OF NON-INFRINGEMENT,
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Please refer to the
 * AGPL (http://www.gnu.org/licenses/agpl-3.0.txt) for more details.
 *
 */

import { JsonRpcRequestTransport } from "core";

import {
  CodeViewCompletionContext,
  CodeViewServer,
  Dictionary,
  DictionaryInfo,
  DictionaryServer,
  EditorServices,
  IgnoredWord,
  kCodeViewGetCompletions,
  kDictionaryAddToUserDictionary,
  kDictionaryAvailableDictionaries,
  kDictionaryGetDictionary,
  kDictionaryGetIgnoredwords,
  kDictionaryGetUserDictionary,
  kDictionaryIgnoreWord,
  kDictionaryUnignoreWord,
  kMathMathjaxTypesetSvg,
  kPrefsGetPrefs,
  kPrefsSetPrefs,
  kSourceGetSourcePosLocations,
  MathjaxTypesetOptions,
  MathServer,
  Prefs,
  PrefsServer,
  SourcePosLocation,
  SourceServer,
  
} from "editor-types";



export function editorJsonRpcServices(request: JsonRpcRequestTransport) : EditorServices {
  return {
    math: editorMathJsonRpcServer(request),
    dictionary: editorDictionaryJsonRpcServer(request),
    prefs: editorPrefsJsonRpcServer(request),
    source: editorSourceJsonRpcServer(request),
    codeview: editorCompletionJsonRpcServer(request)
  };
}

export function editorSourceJsonRpcServer(request: JsonRpcRequestTransport) : SourceServer {
  return {
    getSourcePosLocations(markdown: string) : Promise<SourcePosLocation[]> {
        return request(kSourceGetSourcePosLocations, [markdown]);
    },
  }
}

export function editorMathJsonRpcServer(request: JsonRpcRequestTransport) : MathServer {
  return {
    mathjaxTypeset(math: string, options: MathjaxTypesetOptions) {
      return request(kMathMathjaxTypesetSvg, [math, options]);
    }
  }
}

export function editorCompletionJsonRpcServer(request: JsonRpcRequestTransport) : CodeViewServer {
  return {
    codeViewCompletions(context: CodeViewCompletionContext) {
      return request(kCodeViewGetCompletions, [context]);
    },
  }
}

export function editorDictionaryJsonRpcServer(request: JsonRpcRequestTransport) : DictionaryServer {
  return {
    availableDictionaries() : Promise<DictionaryInfo[]> {
      return request(kDictionaryAvailableDictionaries, []);
    },
    getDictionary(locale: string) : Promise<Dictionary> {
      return request(kDictionaryGetDictionary, [locale]);
    },
    getUserDictionary() : Promise<string[]> {
      return request(kDictionaryGetUserDictionary, []);
    },
    addToUserDictionary(word: string) : Promise<string[]> {
      return request(kDictionaryAddToUserDictionary, [word]);
    },
    getIgnoredWords(context: string):  Promise<string[]> {
      return request(kDictionaryGetIgnoredwords, [context]);
    },
    ignoreWord(word: IgnoredWord) : Promise<string[]> {
      return request(kDictionaryIgnoreWord, [word]);
    },
    unignoreWord(word: IgnoredWord) : Promise<string[]> {
      return request(kDictionaryUnignoreWord, [word]);
    }
  }
}

export function editorPrefsJsonRpcServer(request: JsonRpcRequestTransport) : PrefsServer {
  return {
    getPrefs() : Promise<Prefs> {
      return request(kPrefsGetPrefs, []);
    },
    setPrefs(prefs: Prefs) : Promise<void> {
      return request(kPrefsSetPrefs, [prefs]);
    }
  }
}

