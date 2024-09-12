import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import ForumHttpApi from './Service/forum-http-api.implementation';
import { Forum } from './Entity/forum.class';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  forumPosts: Forum[] = []; // Liste des forums
  sortBy: string = 'date'; // Option de tri
  isLoading = true; // Indicateur de chargement

  constructor(
    private forumHttpApi: ForumHttpApi, // Service pour appeler les API du back-end
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.loadForumPosts();
  }

  // Charge les posts à partir du backend
  async loadForumPosts() {
    try {
      this.isLoading = true;
      this.forumPosts = await this.forumHttpApi.getAllForums();
    } catch (error) {
      console.error('Erreur lors du chargement des forums :', error);
    } finally {
      this.isLoading = false;
    }
  }

  navigateToNewPost() {
    this.navCtrl.navigateForward('/new-post');
  }

  openPost(post: Forum) {
    this.navCtrl.navigateForward(`/post-detail/${post.id}`);
  }

  // Permet de liker un post
  likePost(post: Forum, event: Event) {
    event.stopPropagation(); // Empêche l'ouverture de la carte lors du clic sur le like
    post.liked = !post.liked; // Utilisation de la propriété liked correctement typée
    post.liked ? post.likes++ : post.likes--; // Incrémente ou décrémente le nombre de likes
  }

  // Trie les posts
  sortPosts() {
    if (this.sortBy === 'date') {
      this.forumPosts.sort(
        (a, b) => b.dateCreation.getTime() - a.dateCreation.getTime()
      );
    } else if (this.sortBy === 'popularity') {
      this.forumPosts.sort((a, b) => (b['likes'] || 0) - (a['likes'] || 0));
    }
  }
}
