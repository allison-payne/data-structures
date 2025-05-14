import TrieEditorForm from '~/components/trie/editor-form';
import TrieSVGViewer from '~/components/trie/svg-viewer';
import { TrieProvider } from '~/context/TrieContext';

export const TRIE_ROUTE = 'trie';

/**
 *
 */
export default function Trie() {
  const initialWords = ['tree', 'trie', 'try', 'trial', 'triangle', 'trend'];

  return (
    <TrieProvider initialWords={initialWords}>
      <div className="flex items-center justify-center dark:bg-neutral-400 border-0 rounded-2xl p-3">
        <TrieSVGViewer />
        <TrieEditorForm />
      </div>
    </TrieProvider>
  );
}
