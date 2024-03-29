import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollectionService } from './collection.service';

// Menu
export interface Menu {
	path?: string;
	param?: string,
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor(private collectionService: CollectionService) { 
		this.loadCollections();
	}

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'home', type: 'link', active: false, path: '/home'
		},
		// {
		// 	title: 'home2', type: 'link', active: false, path: '/home/two'
		// },
		// {
		// 	title: 'Gallery', type: 'link', active: false, path: '/page/gallery'
		// },
		{
			title: 'About us', type: 'link', active: false, path: '/page/aboutus'
		},
		{
			title: 'Influencers program', type: 'link', active: false, path: '/page/influencers-program'
		},
		{
			title: 'FAQ', type: 'link', active: false, path: '/page/faq'
		}
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'home', type: 'link', active: false, path: '/home'
		},
		// {
		// 	title: 'home2', type: 'link', active: false, path: '/home/two'
		// },
		// {
		// 	title: 'Gallery', type: 'link', active: false, path: '/page/gallery'
		// },
		{
			title: 'About us', type: 'link', active: false, path: '/page/aboutus'
		},
		{
			title: 'Influencers program', type: 'link', active: false, path: '/page/influencers-program'
		},
		{
			title: 'FAQ', type: 'link', active: false, path: '/page/faq'
		}
	];

	// Array

	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

	private loadCollections() {
		// Obtén las primeras cuatro colecciones del servicio CollectionService
		this.collectionService.getCollections.subscribe((collections) => {			
		  const dynamicMenuItems = collections.map((collection) => {
			return {
			  path: '/shop',
			  param: collection.name,
			  title: collection.name,
			  type: 'link',
			};
		  });

		  dynamicMenuItems.push({
			path: '/shop',
			  param: 'All',
			  title: 'All',
			  type: 'link',
		  })
	
		  // Agrega las colecciones dinámicas al menú
		  this.MENUITEMS.splice(1, 0, {
			title: 'collections',
			type: 'sub',
			active: false,
			children: dynamicMenuItems,
		  });

		  this.LEFTMENUITEMS.splice(1, 0, {
			title: 'collections',
			type: 'sub',
			active: false,
			children: dynamicMenuItems,
		  });
		  
		});
	  }
}
