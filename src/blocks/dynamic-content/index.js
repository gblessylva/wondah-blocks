import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import metadata from './block.json';
import './style.scss';

registerBlockType(metadata.name, {
    ...metadata,

    edit: ({ attributes, setAttributes }) => {
        const [availablePostTypes, setAvailablePostTypes] = useState([]);
        const [posts, setPosts] = useState([]);
        const {
            postType,
            postsPerPage,
            columns,
            orderBy,
            order,
            displayFeaturedImage,
            displayExcerpt,
            displayDate,
            layout,
            parentPage,

        } = attributes;
        const [availablePages, setAvailablePages] = useState([]);

        // Fetch available post types
        useEffect(() => {
            apiFetch({ path: '/wp/v2/types' }).then((postTypes) => {
                const types = Object.keys(postTypes).map((type) => ({
                    label: postTypes[type].name,
                    value: type
                }));
                setAvailablePostTypes(types);
            });
        }, []);

        useEffect(() => {
            if (postType === 'page') {
                apiFetch({ path: '/wp/v2/pages?per_page=100' }).then((pages) => {
                    const parentPages = pages
                        .filter(page => page.parent === 0)
                        .map(page => ({
                            label: page.title.rendered,
                            value: page.id.toString()
                        }));
                    setAvailablePages([{ label: 'All Pages', value: '0' }, ...parentPages]);
                });
            }
        }, [postType]);


        // Fetch posts based on selected post type
        // Update the posts fetch to include parent page parameter
        useEffect(() => {
            const currentPostType = postType || 'post';
            let path = `/wp/v2/${currentPostType}`;

            // Add 's' for posts
            // if (currentPostType === 'post') {
                path += 's';
            // }

            const queryParams = new URLSearchParams({
                per_page: postsPerPage?.toString() || '6',
                orderby: orderBy || 'date',
                order: (order || 'desc').toLowerCase(),
                _embed: 'true'
            });

            // Only add parent parameter if it's a valid page ID
            if (currentPostType === 'page' && attributes.parentPage && attributes.parentPage !== '0') {
                queryParams.append('parent', attributes.parentPage);
            }

            path += `?${queryParams.toString()}`;

            apiFetch({ path })
                .then((fetchedPosts) => {
                    setPosts(fetchedPosts);
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                    setPosts([]);
                });
        }, [postType, postsPerPage, orderBy, order, attributes.parentPage]);

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Content Settings', 'wondah-blocks')}>
                        <SelectControl
                            label={__('Post Type', 'wondah-blocks')}
                            value={postType}
                            options={[
                                { label: 'Posts', value: 'post' },
                                { label: 'Pages', value: 'page' },
                                ...availablePostTypes.filter(type => !['post', 'page'].includes(type.value))
                            ]}
                            onChange={(value) => setAttributes({ postType: value })}
                        />
                        {postType === 'page' && (
                            <SelectControl
                                label={__('Parent Page', 'wondah-blocks')}
                                value={attributes.parentPage}
                                options={availablePages}
                                onChange={(value) => setAttributes({ parentPage: value })}
                            />
                        )}
                        <RangeControl
                            label={__('Posts per Page', 'wondah-blocks')}
                            value={postsPerPage}
                            onChange={(value) => setAttributes({ postsPerPage: value })}
                            min={1}
                            max={12}
                        />
                        <RangeControl
                            label={__('Columns', 'wondah-blocks')}
                            value={columns}
                            onChange={(value) => setAttributes({ columns: value })}
                            min={1}
                            max={4}
                        />
                        <SelectControl
                            label={__('Order By', 'wondah-blocks')}
                            value={orderBy}
                            options={[
                                { label: 'Date', value: 'date' },
                                { label: 'Title', value: 'title' },
                                { label: 'Menu Order', value: 'menu_order' }
                            ]}
                            onChange={(value) => setAttributes({ orderBy: value })}
                        />
                        <SelectControl
                            label={__('Order', 'wondah-blocks')}
                            value={order}
                            options={[
                                { label: 'Descending', value: 'desc' },
                                { label: 'Ascending', value: 'asc' }
                            ]}
                            onChange={(value) => setAttributes({ order: value })}
                        />
                        <SelectControl
                            label={__('Layout Style', 'wondah-blocks')}
                            value={layout}
                            options={[
                                { label: 'Grid Layout', value: 'grid' },
                                { label: 'Modern Layout', value: 'modern' }
                            ]}
                            onChange={(value) => setAttributes({ layout: value })}
                        />
                        <ToggleControl
                            label={__('Display Featured Image', 'wondah-blocks')}
                            checked={displayFeaturedImage}
                            onChange={() => setAttributes({ displayFeaturedImage: !displayFeaturedImage })}
                        />
                        <ToggleControl
                            label={__('Display Excerpt', 'wondah-blocks')}
                            checked={displayExcerpt}
                            onChange={() => setAttributes({ displayExcerpt: !displayExcerpt })}
                        />
                        <ToggleControl
                            label={__('Display Date', 'wondah-blocks')}
                            checked={displayDate}
                            onChange={() => setAttributes({ displayDate: !displayDate })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...useBlockProps()}>
                    {layout === 'grid' ? (
                        <div className={`dynamic-content-grid columns-${columns}`}>
                            {posts.map((post) => (
                                <div key={post.id} className="dynamic-content-item">
                                    {displayFeaturedImage && post._embedded?.['wp:featuredmedia'] && (
                                        <div className="featured-image">
                                            <img src={post._embedded['wp:featuredmedia'][0].source_url} alt={post.title.rendered} />
                                        </div>
                                    )}
                                    <div className="content">
                                        <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                        {displayDate && (
                                            <div className="date">
                                                {new Date(post.date).toLocaleDateString()}
                                            </div>
                                        )}
                                        {displayExcerpt && (
                                            <div className="excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="dynamic-content-modern">
                            {posts.map((post) => (
                                <div key={post.id} className="dynamic-content-item">
                                    <div className="content">
                                        <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                        {displayExcerpt && (
                                            <div className="excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                                        )}
                                        <a href={post.link} className="read-more">
                                            {__('Read More', 'wondah-blocks')}
                                        </a>
                                    </div>
                                    {displayFeaturedImage && post._embedded?.['wp:featuredmedia'] && (
                                        <div className="featured-image">
                                            <img
                                                src={post._embedded['wp:featuredmedia'][0].source_url}
                                                alt={post.title.rendered}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        return null;
    }
});