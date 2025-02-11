import { Button, Popover, RangeControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const IconPicker = ({ onSelect, currentIcon, iconSize = 32 }) => {
    const [isOpen, setIsOpen] = useState(false);

    const icons = [
        {
            name: 'shield',
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 2L4 7v9c0 5.55 3.84 10.74 12 13 8.16-2.26 12-7.45 12-13V7L16 2z"/></svg>`
        },
        {
            name: 'shield',
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 2L4 7v9c0 5.55 3.84 10.74 12 13 8.16-2.26 12-7.45 12-13V7L16 2z"/></svg>`
        },
        { 
            name: 'lightning', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M13 2L3 14h9l-1 16 10-12h-9l1-16z"/></svg>` },
        { 
            name: 'support', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 2c-7.72 0-14 6.28-14 14s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2zm0 25c-6.08 0-11-4.92-11-11s4.92-11 11-11 11 4.92 11 11-4.92 11-11 11z"/></svg>` },
        { 
            name: 'star', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 2l3.09 9.26L29 12.27l-6.91 7.23L24.18 30 16 24.89 7.82 30l2.09-10.5L3 12.27l9.91-1.01L16 2z"/></svg>` },
        { 
            name: 'heart', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 29s-13-8.35-13-17a8.5 8.5 0 0117 0 8.5 8.5 0 0117 0c0 8.65-13 17-13 17z"/></svg>` },
        { 
            name: 'check', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M12 24L4 16l2-2 6 6 14-14 2 2-16 16z"/></svg>` },
        { 
            name: 'user', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 16a6 6 0 100-12 6 6 0 000 12zm0 2c-4.42 0-8 3.58-8 8h16c0-4.42-3.58-8-8-8z"/></svg>` },
        { 
            name: 'bell', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 30c1.66 0 3-1.34 3-3h-6c0 1.66 1.34 3 3 3zM24 22v-6c0-3.86-2.91-7.28-6.67-7.93V7c0-.83-.67-1.5-1.5-1.5S14 6.17 14 7v.07C10.91 8.72 8 12.14 8 16v6l-2 2v1h20v-1l-2-2z"/></svg>` },
        { 
            name: 'camera', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 10a6 6 0 100 12 6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z"/></svg>` },
        { 
            name: 'cloud', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M24 18h-1.5A6.5 6.5 0 1012 18H8a4 4 0 100 8h16a4 4 0 100-8z"/></svg>` },
        { 
            name: 'flag', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M6 4v24h2V18h10l2 4h6V6h-6l-2 4H8V4H6z"/></svg>` },
        { 
            name: 'lock', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M16 2a6 6 0 00-6 6v4h-4v16h20V12h-4V8a6 6 0 00-6-6zm-4 6a4 4 0 018 0v4h-8V8z"/></svg>` },
        { 
            name: 'key', 
            svg: `<svg width="${iconSize}" height="${iconSize}" viewBox="0 0 32 32" fill="#4F46E5"><path d="M22 2a10 10 0 00-8.98 14.5L2 27v3h3l3-3h3l3-3h3l1-1V18a10 10 0 100-16z"/></svg>` }
    ];

    return (
        <div className="icon-picker">
            <Button
                onClick={() => setIsOpen(true)}
                className="icon-picker-button"
            >
                <div dangerouslySetInnerHTML={{ __html: currentIcon.replace(/width="([^"]+)"/, `width="${iconSize}"`).replace(/height="([^"]+)"/, `height="${iconSize}"`) }} />
            </Button>
            {isOpen && (
                <Popover
                    onClose={() => setIsOpen(false)}
                    position="bottom center"
                >
                    <div className="icon-grid">
                        {icons.map((icon, index) => (
                            <Button
                                key={index}
                                className="icon-option"
                                onClick={() => {
                                    onSelect(icon.svg);
                                    setIsOpen(false);
                                }}
                            >
                                <div dangerouslySetInnerHTML={{ __html: icon.svg }} />
                            </Button>
                        ))}
                    </div>
                </Popover>
            )}
        </div>
    );
};

export default IconPicker;