import { produce } from 'immer';
import { CHANGE_TITLE, CHANGE_LOGO, SET_COMPONENT, CHANGE_SETTING, MOVE_DOWN, MOVE_UP } from './../actionType';
import { headers, contents, footers } from '../../core/templateMapper';
import { level as levels } from './../../constant';
import { swapElement } from './../reducer.helper';
import { openComponentSetting } from './../actions';

const initialState = {
	site: {
		_id: 1,
		header: {
			component: '1',
			styles: {},
			state: {
				links:[{text:'',url:'',target:''}],
				social:[{icon:'', link:'',title:''},],
				logo: { type: 'text/image', text:'MyBiz', src: '/public/siteid/logo.png',url:'/' }
			}
		},
		footer: null,
		isArticle: false,
		pages: [
			{
				title: 'About Us',
				slug: 'about-us',
				path: '/about-us',
				meta: { key: '', description: '' },
				page_css: '',
				page_js: '',
				content: []
			}
		],
	},
	currentPageIndex: 0,
};

export default function(state = initialState, action) {
	const { payload } = action;
	switch(action.type) {
		case CHANGE_TITLE: {
			console.log('title', payload);
			return produce(state, draft => {
				draft.title = payload.title;
			});
		}
		case CHANGE_LOGO: {
			console.log('loo')
			return produce(state, draft => {
				draft.logo = payload.logo;
			});
		}
		case SET_COMPONENT: {
			const { component } = payload;
			const { type } = component;
			if(type === 'content') {
				const { site, currentPageIndex } = state;
				const page = site.pages[currentPageIndex];
				const Component = contents[component.component] || {};
				const block = Component.component;
				page.content.push({ ...component, state: {...block.defaultSettings}, style: {}});
				return produce(state, draft => {
					draft.site.pages[currentPageIndex] = page;
				});
			} else {
				return produce(state, draft => {
					draft.site[type] = {
						state: {},
						style: {},
						...draft.site[type],
						...component
					};
				});
			}
		}
		case CHANGE_SETTING: {
			const { level, index, block, type } = payload;
			console.log('block', block, level, index, type);
			if(level === levels.COMPONENT) {
				const { site, currentPageIndex } = state;
				const page = site.pages[currentPageIndex];
				if(type === 'content') {
					page.content[index] = {...block};
				} else {
					page[type] = {...block};
				}
				return JSON.parse(JSON.stringify(
					produce(state, draft => {
						draft.site.pages[currentPageIndex] = {...page};
					})
				));
			} else {
				return state;
			}
		}
		case MOVE_UP: {
			const { index } = payload;
			if(index > 0) {
				const { site, currentPageIndex } = state;
				const page = site.pages[currentPageIndex];
				page.content = swapElement(page.content, index - 1, index);
				// action.dispatch(openComponentSetting(index - 1, 'content'))
				return JSON.parse(JSON.stringify(
					produce(state, draft => {
						draft.site.pages[currentPageIndex] = {...page};
					})
				));
			}
			return state;
		}
		case MOVE_DOWN: {
			const { index } = payload;
			const { site, currentPageIndex } = state;
			const page = site.pages[currentPageIndex];
			const contentLength = page.content.length;
			if(contentLength - 1 > index) {
				page.content = swapElement(page.content, index, index + 1);
				action.asyncDispatch(openComponentSetting(index + 1, 'content'))
				return JSON.parse(JSON.stringify(
					produce(state, draft => {
						draft.site.pages[currentPageIndex] = {...page};
					})
				));
			}
			return state;
		}
		default:
			return state;
	}
}
