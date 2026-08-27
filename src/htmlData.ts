export interface AttributeInfo {
    name: string;
    /** Attribute rendered without a value, e.g. `input(type="checkbox" checked)`. */
    boolean?: boolean;
    values?: string[];
    description?: string;
}

export interface TagInfo {
    name: string;
    description: string;
    /** Void elements never have children, so they must not increase indentation. */
    void?: boolean;
}

export const HTML_TAGS: TagInfo[] = [
    { name: 'a', description: 'Hyperlink' },
    { name: 'abbr', description: 'Abbreviation or acronym' },
    { name: 'address', description: 'Contact information' },
    { name: 'area', description: 'Area inside an image map', void: true },
    { name: 'article', description: 'Self-contained composition' },
    { name: 'aside', description: 'Content tangentially related to the main content' },
    { name: 'audio', description: 'Embedded sound content' },
    { name: 'b', description: 'Bring attention to' },
    { name: 'base', description: 'Base URL for relative URLs', void: true },
    { name: 'bdi', description: 'Bidirectional isolate' },
    { name: 'bdo', description: 'Bidirectional text override' },
    { name: 'blockquote', description: 'Block quotation' },
    { name: 'body', description: 'Document body' },
    { name: 'br', description: 'Line break', void: true },
    { name: 'button', description: 'Clickable button' },
    { name: 'canvas', description: 'Drawing surface' },
    { name: 'caption', description: 'Table caption' },
    { name: 'cite', description: 'Title of a work' },
    { name: 'code', description: 'Inline code fragment' },
    { name: 'col', description: 'Table column', void: true },
    { name: 'colgroup', description: 'Group of table columns' },
    { name: 'data', description: 'Machine-readable value' },
    { name: 'datalist', description: 'Predefined options for an input' },
    { name: 'dd', description: 'Description list detail' },
    { name: 'del', description: 'Deleted text' },
    { name: 'details', description: 'Disclosure widget' },
    { name: 'dfn', description: 'Defining instance of a term' },
    { name: 'dialog', description: 'Dialog box or modal' },
    { name: 'div', description: 'Generic container' },
    { name: 'dl', description: 'Description list' },
    { name: 'dt', description: 'Description list term' },
    { name: 'em', description: 'Stressed emphasis' },
    { name: 'embed', description: 'External content', void: true },
    { name: 'fieldset', description: 'Group of form controls' },
    { name: 'figcaption', description: 'Figure caption' },
    { name: 'figure', description: 'Self-contained figure' },
    { name: 'footer', description: 'Footer of the nearest section' },
    { name: 'form', description: 'Form for user input' },
    { name: 'h1', description: 'Heading level 1' },
    { name: 'h2', description: 'Heading level 2' },
    { name: 'h3', description: 'Heading level 3' },
    { name: 'h4', description: 'Heading level 4' },
    { name: 'h5', description: 'Heading level 5' },
    { name: 'h6', description: 'Heading level 6' },
    { name: 'head', description: 'Document metadata container' },
    { name: 'header', description: 'Introductory content' },
    { name: 'hgroup', description: 'Heading group' },
    { name: 'hr', description: 'Thematic break', void: true },
    { name: 'html', description: 'Document root' },
    { name: 'i', description: 'Idiomatic text' },
    { name: 'iframe', description: 'Nested browsing context' },
    { name: 'img', description: 'Image', void: true },
    { name: 'input', description: 'Form input control', void: true },
    { name: 'ins', description: 'Inserted text' },
    { name: 'kbd', description: 'Keyboard input' },
    { name: 'label', description: 'Caption for a form control' },
    { name: 'legend', description: 'Caption for a fieldset' },
    { name: 'li', description: 'List item' },
    { name: 'link', description: 'External resource link', void: true },
    { name: 'main', description: 'Main content of the document' },
    { name: 'map', description: 'Image map' },
    { name: 'mark', description: 'Marked or highlighted text' },
    { name: 'menu', description: 'Menu of commands' },
    { name: 'meta', description: 'Document metadata', void: true },
    { name: 'meter', description: 'Scalar measurement within a range' },
    { name: 'nav', description: 'Navigation section' },
    { name: 'noscript', description: 'Fallback when scripting is disabled' },
    { name: 'object', description: 'External resource' },
    { name: 'ol', description: 'Ordered list' },
    { name: 'optgroup', description: 'Group of options' },
    { name: 'option', description: 'Option in a select or datalist' },
    { name: 'output', description: 'Result of a calculation' },
    { name: 'p', description: 'Paragraph' },
    { name: 'picture', description: 'Container for responsive images' },
    { name: 'pre', description: 'Preformatted text' },
    { name: 'progress', description: 'Progress indicator' },
    { name: 'q', description: 'Inline quotation' },
    { name: 'rp', description: 'Ruby fallback parenthesis' },
    { name: 'rt', description: 'Ruby annotation text' },
    { name: 'ruby', description: 'Ruby annotation' },
    { name: 's', description: 'Text no longer accurate' },
    { name: 'samp', description: 'Sample output' },
    { name: 'script', description: 'Embedded or external script' },
    { name: 'search', description: 'Search controls container' },
    { name: 'section', description: 'Generic standalone section' },
    { name: 'select', description: 'Select control' },
    { name: 'small', description: 'Side comment' },
    { name: 'source', description: 'Media or image source', void: true },
    { name: 'span', description: 'Generic inline container' },
    { name: 'strong', description: 'Strong importance' },
    { name: 'style', description: 'Embedded CSS' },
    { name: 'sub', description: 'Subscript' },
    { name: 'summary', description: 'Summary of a details element' },
    { name: 'sup', description: 'Superscript' },
    { name: 'table', description: 'Table' },
    { name: 'tbody', description: 'Table body' },
    { name: 'td', description: 'Table data cell' },
    { name: 'template', description: 'Inert content fragment' },
    { name: 'textarea', description: 'Multiline text control' },
    { name: 'tfoot', description: 'Table footer' },
    { name: 'th', description: 'Table header cell' },
    { name: 'thead', description: 'Table head' },
    { name: 'time', description: 'Date or time' },
    { name: 'title', description: 'Document title' },
    { name: 'tr', description: 'Table row' },
    { name: 'track', description: 'Text track for media', void: true },
    { name: 'u', description: 'Unarticulated annotation' },
    { name: 'ul', description: 'Unordered list' },
    { name: 'var', description: 'Variable' },
    { name: 'video', description: 'Embedded video' },
    { name: 'wbr', description: 'Line break opportunity', void: true }
];

export const VOID_TAGS = new Set(HTML_TAGS.filter((tag) => tag.void).map((tag) => tag.name));

const BOOLEAN_VALUES = ['true', 'false'];

export const GLOBAL_ATTRIBUTES: AttributeInfo[] = [
    { name: 'id', description: 'Unique identifier. Shorthand: `tag#id`' },
    { name: 'class', description: 'Space separated class names. Shorthand: `tag.class`' },
    { name: 'style', description: 'Inline CSS declarations' },
    { name: 'title', description: 'Advisory information / tooltip' },
    { name: 'lang', description: 'Language of the element content' },
    { name: 'dir', values: ['ltr', 'rtl', 'auto'] },
    { name: 'hidden', boolean: true },
    { name: 'tabindex' },
    { name: 'accesskey' },
    { name: 'draggable', values: BOOLEAN_VALUES },
    { name: 'spellcheck', values: BOOLEAN_VALUES },
    { name: 'translate', values: ['yes', 'no'] },
    { name: 'contenteditable', values: ['true', 'false', 'plaintext-only'] },
    { name: 'inert', boolean: true },
    { name: 'role' },
    { name: 'slot' },
    { name: 'part' },
    { name: 'itemscope', boolean: true },
    { name: 'itemtype' },
    { name: 'itemprop' },
    { name: 'onclick' },
    { name: 'onchange' },
    { name: 'oninput' },
    { name: 'onsubmit' },
    { name: 'onfocus' },
    { name: 'onblur' },
    { name: 'onkeyup' },
    { name: 'onkeydown' },
    { name: 'onmouseover' },
    { name: 'onmouseout' }
];

const REFERRER_POLICIES = [
    'no-referrer',
    'no-referrer-when-downgrade',
    'origin',
    'origin-when-cross-origin',
    'same-origin',
    'strict-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url'
];

const CROSS_ORIGIN = ['anonymous', 'use-credentials'];

export const TAG_ATTRIBUTES: Record<string, AttributeInfo[]> = {
    a: [
        { name: 'href', description: 'Destination URL' },
        { name: 'target', values: ['_self', '_blank', '_parent', '_top'] },
        {
            name: 'rel',
            values: ['noopener', 'noreferrer', 'nofollow', 'alternate', 'author', 'bookmark', 'external', 'help', 'license', 'next', 'prev', 'search', 'tag']
        },
        { name: 'download' },
        { name: 'hreflang' },
        { name: 'type' },
        { name: 'ping' },
        { name: 'referrerpolicy', values: REFERRER_POLICIES }
    ],
    area: [
        { name: 'alt' },
        { name: 'coords' },
        { name: 'shape', values: ['rect', 'circle', 'poly', 'default'] },
        { name: 'href' },
        { name: 'target', values: ['_self', '_blank', '_parent', '_top'] },
        { name: 'download' }
    ],
    audio: [
        { name: 'src' },
        { name: 'controls', boolean: true },
        { name: 'autoplay', boolean: true },
        { name: 'loop', boolean: true },
        { name: 'muted', boolean: true },
        { name: 'preload', values: ['none', 'metadata', 'auto'] },
        { name: 'crossorigin', values: CROSS_ORIGIN }
    ],
    base: [{ name: 'href' }, { name: 'target', values: ['_self', '_blank', '_parent', '_top'] }],
    blockquote: [{ name: 'cite' }],
    body: [{ name: 'onload' }, { name: 'onunload' }],
    button: [
        { name: 'type', values: ['button', 'submit', 'reset'] },
        { name: 'name' },
        { name: 'value' },
        { name: 'disabled', boolean: true },
        { name: 'autofocus', boolean: true },
        { name: 'form' },
        { name: 'formaction' },
        { name: 'formmethod', values: ['get', 'post', 'dialog'] },
        { name: 'formnovalidate', boolean: true }
    ],
    canvas: [{ name: 'width' }, { name: 'height' }],
    col: [{ name: 'span' }],
    colgroup: [{ name: 'span' }],
    data: [{ name: 'value' }],
    del: [{ name: 'cite' }, { name: 'datetime' }],
    details: [{ name: 'open', boolean: true }, { name: 'name' }],
    dialog: [{ name: 'open', boolean: true }],
    embed: [{ name: 'src' }, { name: 'type' }, { name: 'width' }, { name: 'height' }],
    fieldset: [{ name: 'name' }, { name: 'disabled', boolean: true }, { name: 'form' }],
    form: [
        { name: 'action' },
        { name: 'method', values: ['get', 'post', 'dialog'] },
        { name: 'enctype', values: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'] },
        { name: 'target', values: ['_self', '_blank', '_parent', '_top'] },
        { name: 'name' },
        { name: 'novalidate', boolean: true },
        { name: 'autocomplete', values: ['on', 'off'] },
        { name: 'onsubmit' }
    ],
    html: [{ name: 'lang' }, { name: 'dir', values: ['ltr', 'rtl', 'auto'] }, { name: 'xmlns' }],
    iframe: [
        { name: 'src' },
        { name: 'srcdoc' },
        { name: 'name' },
        { name: 'width' },
        { name: 'height' },
        { name: 'title' },
        { name: 'loading', values: ['lazy', 'eager'] },
        { name: 'allow' },
        { name: 'allowfullscreen', boolean: true },
        { name: 'sandbox' },
        { name: 'referrerpolicy', values: REFERRER_POLICIES }
    ],
    img: [
        { name: 'src' },
        { name: 'alt' },
        { name: 'width' },
        { name: 'height' },
        { name: 'srcset' },
        { name: 'sizes' },
        { name: 'loading', values: ['lazy', 'eager'] },
        { name: 'decoding', values: ['sync', 'async', 'auto'] },
        { name: 'crossorigin', values: CROSS_ORIGIN },
        { name: 'referrerpolicy', values: REFERRER_POLICIES },
        { name: 'ismap', boolean: true },
        { name: 'usemap' }
    ],
    input: [
        {
            name: 'type',
            values: [
                'text', 'password', 'email', 'number', 'tel', 'url', 'search',
                'date', 'time', 'datetime-local', 'month', 'week', 'color',
                'checkbox', 'radio', 'file', 'range', 'hidden',
                'submit', 'reset', 'button', 'image'
            ]
        },
        { name: 'name' },
        { name: 'value' },
        { name: 'placeholder' },
        { name: 'required', boolean: true },
        { name: 'disabled', boolean: true },
        { name: 'readonly', boolean: true },
        { name: 'checked', boolean: true },
        { name: 'multiple', boolean: true },
        { name: 'autofocus', boolean: true },
        { name: 'min' },
        { name: 'max' },
        { name: 'step' },
        { name: 'pattern' },
        { name: 'minlength' },
        { name: 'maxlength' },
        { name: 'accept' },
        { name: 'autocomplete', values: ['on', 'off', 'name', 'email', 'username', 'current-password', 'new-password', 'tel', 'street-address', 'postal-code'] },
        { name: 'list' },
        { name: 'form' }
    ],
    ins: [{ name: 'cite' }, { name: 'datetime' }],
    label: [{ name: 'for', description: 'id of the labelled control' }, { name: 'form' }],
    li: [{ name: 'value' }],
    link: [
        {
            name: 'rel',
            values: ['stylesheet', 'icon', 'apple-touch-icon', 'manifest', 'preload', 'preconnect', 'dns-prefetch', 'prefetch', 'canonical', 'alternate']
        },
        { name: 'href' },
        { name: 'type', values: ['text/css'] },
        { name: 'media' },
        { name: 'sizes' },
        { name: 'as', values: ['script', 'style', 'font', 'image', 'fetch', 'document'] },
        { name: 'crossorigin', values: CROSS_ORIGIN },
        { name: 'integrity' }
    ],
    map: [{ name: 'name' }],
    meta: [
        { name: 'charset', values: ['utf-8'] },
        { name: 'name', values: ['viewport', 'description', 'keywords', 'author', 'robots', 'theme-color'] },
        { name: 'content' },
        { name: 'property' },
        { name: 'http-equiv', values: ['content-type', 'refresh', 'x-ua-compatible', 'content-security-policy'] }
    ],
    meter: [{ name: 'value' }, { name: 'min' }, { name: 'max' }, { name: 'low' }, { name: 'high' }, { name: 'optimum' }, { name: 'form' }],
    object: [{ name: 'data' }, { name: 'type' }, { name: 'name' }, { name: 'width' }, { name: 'height' }],
    ol: [{ name: 'type', values: ['1', 'a', 'A', 'i', 'I'] }, { name: 'start' }, { name: 'reversed', boolean: true }],
    optgroup: [{ name: 'label' }, { name: 'disabled', boolean: true }],
    option: [{ name: 'value' }, { name: 'label' }, { name: 'selected', boolean: true }, { name: 'disabled', boolean: true }],
    output: [{ name: 'for' }, { name: 'name' }, { name: 'form' }],
    progress: [{ name: 'value' }, { name: 'max' }],
    q: [{ name: 'cite' }],
    script: [
        { name: 'src' },
        { name: 'type', values: ['module', 'text/javascript', 'application/json', 'importmap'] },
        { name: 'async', boolean: true },
        { name: 'defer', boolean: true },
        { name: 'nomodule', boolean: true },
        { name: 'crossorigin', values: CROSS_ORIGIN },
        { name: 'integrity' },
        { name: 'referrerpolicy', values: REFERRER_POLICIES }
    ],
    select: [
        { name: 'name' },
        { name: 'multiple', boolean: true },
        { name: 'required', boolean: true },
        { name: 'disabled', boolean: true },
        { name: 'autofocus', boolean: true },
        { name: 'size' },
        { name: 'form' }
    ],
    source: [{ name: 'src' }, { name: 'srcset' }, { name: 'type' }, { name: 'media' }, { name: 'sizes' }],
    style: [{ name: 'type', values: ['text/css'] }, { name: 'media' }],
    table: [{ name: 'summary' }],
    td: [{ name: 'colspan' }, { name: 'rowspan' }, { name: 'headers' }],
    textarea: [
        { name: 'name' },
        { name: 'rows' },
        { name: 'cols' },
        { name: 'placeholder' },
        { name: 'required', boolean: true },
        { name: 'disabled', boolean: true },
        { name: 'readonly', boolean: true },
        { name: 'autofocus', boolean: true },
        { name: 'minlength' },
        { name: 'maxlength' },
        { name: 'wrap', values: ['soft', 'hard', 'off'] },
        { name: 'form' }
    ],
    th: [
        { name: 'scope', values: ['row', 'col', 'rowgroup', 'colgroup'] },
        { name: 'colspan' },
        { name: 'rowspan' },
        { name: 'abbr' },
        { name: 'headers' }
    ],
    time: [{ name: 'datetime' }],
    track: [
        { name: 'kind', values: ['subtitles', 'captions', 'descriptions', 'chapters', 'metadata'] },
        { name: 'src' },
        { name: 'srclang' },
        { name: 'label' },
        { name: 'default', boolean: true }
    ],
    video: [
        { name: 'src' },
        { name: 'poster' },
        { name: 'width' },
        { name: 'height' },
        { name: 'controls', boolean: true },
        { name: 'autoplay', boolean: true },
        { name: 'loop', boolean: true },
        { name: 'muted', boolean: true },
        { name: 'playsinline', boolean: true },
        { name: 'preload', values: ['none', 'metadata', 'auto'] },
        { name: 'crossorigin', values: CROSS_ORIGIN }
    ]
};

export function attributesForTag(tag: string | undefined): AttributeInfo[] {
    const specific = tag ? TAG_ATTRIBUTES[tag] ?? [] : [];
    const specificNames = new Set(specific.map((attribute) => attribute.name));
    return [...specific, ...GLOBAL_ATTRIBUTES.filter((attribute) => !specificNames.has(attribute.name))];
}

export function findAttribute(tag: string | undefined, name: string): AttributeInfo | undefined {
    return attributesForTag(tag).find((attribute) => attribute.name === name);
}
