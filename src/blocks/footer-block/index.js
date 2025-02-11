import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import './style.scss';

const TEMPLATE = [
    ['core/columns', { columns: 5 }, [
        ['core/column', {}, [
            ['core/image', { 
                className: 'footer-logo',
                sizeSlug: 'medium'
            }],
            ['core/paragraph', { placeholder: 'Company description...' }]
        ]],
        ['core/column', {}, [
            ['core/heading', { level: 3, content: 'About' }],
            ['core/list', { 
                className: 'footer-menu',
                placeholder: 'Add menu items...'
            }]
        ]],
        ['core/column', {}, [
            ['core/heading', { level: 3, content: 'Products' }],
            ['core/list', { 
                className: 'footer-menu',
                placeholder: 'Add menu items...'
            }]
        ]],
        ['core/column', {}, [
            ['core/heading', { level: 3, content: 'Resources' }],
            ['core/list', { 
                className: 'footer-menu',
                placeholder: 'Add menu items...'
            }]
        ]],
        ['core/column', {}, [
            ['core/heading', { level: 3, content: 'Support' }],
            ['core/list', { 
                className: 'footer-menu',
                placeholder: 'Add menu items...'
            }]
        ]]
    ]],
    ['core/group', { className: 'footer-bottom' }, [
        ['core/group', { className: 'footer-bottom-content' }, [
            ['core/paragraph', { className: 'copyright', content: '© 2024 Your Company' }],
            ['core/list', { 
                className: 'legal-links',
                placeholder: 'Add legal links...'
            }],
            ['core/social-links', { className: 'social-links' }]
        ]]
    ]]
];

registerBlockType('wondah-blocks/footer-block', {
    title: __('Footer Block', 'wondah-blocks'),
    icon: 'align-wide',
    category: 'design',
    supports: {
        align: ['full'],
        html: false
    },

    edit: () => {
        const blockProps = useBlockProps({
            className: 'site-footer'
        });

        return (
            <div {...blockProps}>
                <InnerBlocks
                    template={TEMPLATE}
                    templateLock="insert"
                />
            </div>
        );
    },

    save: () => {
        const blockProps = useBlockProps.save({
            className: 'site-footer'
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    }
});