import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import  apiFetch  from '@wordpress/api-fetch';
import { SelectControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { ToggleControl, ColorPicker, ColorPalette, PanelBody } from '@wordpress/components';
const { InspectorControls, useSetting, RichText } = wp.blockEditor;

// GET Posts

const postSelections = [];
	apiFetch( { path: '/wp/v2/categories/' } ).then( ( posts ) => {
		// postSelections.push({label: "Select a Post", value: 0});
		// $.each( posts, function( key, val ) {
		// 	postSelections.push({label: val.title.rendered, value: val.id});
		// });
		// console.log(posts);
		posts.forEach( post => {
			postSelections.push({label: post.name, value: post.id });
			//console.log(post['title'].rendered)
		});

		return postSelections;

	} );

	


export default function Edit( props ) {

	const {
		attributes,
		setAttributes,
	} = props
	const { selectCat } = attributes 

	const postsList = [];
	 console.log(  selectCat  );
	let postPath = '/wp/v2/posts?categories='+ selectCat ;
	console.log(postPath);
		if(selectCat){

		apiFetch( { path: postPath } ).then( ( postsbycat ) => {
			// postSelections.push({label: "Select a Post", value: 0});
			// $.each( posts, function( key, val ) {
			// 	postSelections.push({label: val.title.rendered, value: val.id});
			// });
			// console.log(posts);
			postsbycat.forEach( postitem => {
				//postSelections.push({label: post.title, value: post.id });
				console.log(postitem.title.rendered)
			});

			return postsList;

		} );
		}



	return (
		
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody className={'abc'}>
					<SelectControl
					
						label="Select Category"
						value={selectCat }
						options={ postSelections }
						onChange={(newVal) => setAttributes({selectCat: newVal})}
					/>
				</PanelBody>
			</InspectorControls>




		</div>
	);
}
