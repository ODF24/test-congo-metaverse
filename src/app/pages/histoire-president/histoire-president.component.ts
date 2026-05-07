import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface PresidentData {
  nom: string;
  img: string;
  bio: string;
  naissance: string; deces: string; fonctions: string;
  mandat: string; parti: string; conjoint?: string;
}

@Component({
  selector: 'app-histoire-president',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './histoire-president.component.html',
  styleUrl: './histoire-president.component.css'
})
export class HistoirePresidentComponent implements OnInit {
  president: PresidentData | null = null;

  private data: Record<string, PresidentData> = {
    alphonse: {
      nom: 'Alphonse Massamba-Débat',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353115/Portrait_d_homme_%C3%A9l%C3%A9gant_et_calme_hnzrza.png',
      bio: "Alphonse Massamba-Débat est un homme d'État congolais né en 1921 à Nkolo dans le district de Boko et mort le 25 mars 1977 à Brazzaville. Il est président de la République du Congo de 1963 à 1968.",
      naissance: '1921, Nkolo', deces: '25 mars 1977, Brazzaville',
      fonctions: 'Président du Congo (1963–1968), Premier ministre (1963)',
      mandat: '19 décembre 1963 – 4 septembre 1968',
      parti: 'Mouvement national de la révolution',
      conjoint: 'Marie Massamba-Débat'
    },
    fulbert: {
      nom: 'Fulbert Youlou',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353114/092f815b-9d32-49e1-aea0-2ddf8d909b80_e2iuxj.png',
      bio: "Fulbert Youlou est le premier président de la République du Congo. Il accède au pouvoir lors de l'indépendance en 1960 et gouverne jusqu'en 1963, date à laquelle il est renversé par un soulèvement populaire.",
      naissance: '9 juin 1917, Madibou', deces: '5 mai 1972, Madrid',
      fonctions: "Premier Président de la République du Congo (1960-1963)",
      mandat: '15 août 1960 – 15 août 1963',
      parti: "Union Démocratique pour la Défense des Intérêts Africains (UDDIA)"
    },
    marien: {
      nom: 'Marien Ngouabi',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353114/97a1750b-1165-482e-adc8-898796e3eab2_hprwi4.png',
      bio: "Marien Ngouabi est un officier militaire et homme d'État congolais qui prit le pouvoir en 1968 lors d'un coup d'État. Il fonda la République populaire du Congo et fut assassiné le 18 mars 1977.",
      naissance: '31 décembre 1938, Ombélé', deces: '18 mars 1977, Brazzaville',
      fonctions: 'Président de la République Populaire du Congo (1968–1977)',
      mandat: '31 décembre 1968 – 18 mars 1977',
      parti: 'Parti Congolais du Travail'
    },
    joachim: {
      nom: 'Joachim Yhombi-Opango',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353114/2d09d06d-34c2-4bb7-a548-954c1b47159e_lm3uen.png',
      bio: "Joachim Yhombi-Opango est un militaire et homme d'État congolais. Il assuma la présidence après l'assassinat de Marien Ngouabi jusqu'à son renversement en 1979.",
      naissance: '1939, Owando', deces: '17 novembre 2020',
      fonctions: 'Président de la République Populaire du Congo (1977–1979)',
      mandat: '5 avril 1977 – 5 février 1979',
      parti: 'Parti Congolais du Travail'
    },
    denis1: {
      nom: 'Denis Sassou Nguesso (1er mandat)',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353114/264d8761-363c-4d23-b602-208dba71681e_byjdjw.png',
      bio: "Denis Sassou Nguesso accède à la présidence en 1979. Durant son premier mandat, il dirige la République Populaire du Congo sous le régime marxiste jusqu'à la démocratisation de 1992.",
      naissance: '23 novembre 1943, Edou', deces: 'Vivant',
      fonctions: 'Président de la République (1979–1992 et 1997–présent)',
      mandat: '8 février 1979 – 31 août 1992',
      parti: 'Parti Congolais du Travail'
    },
    pascal: {
      nom: 'Pascal Lissouba',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776355197/Capture_d_%C3%A9cran_2026-04-16_165913_ymiidm.png',
      bio: "Pascal Lissouba est élu démocratiquement en 1992 et devient le premier président élu au suffrage universel lors de la transition démocratique. Son mandat prend fin lors de la guerre civile de 1997.",
      naissance: '15 novembre 1931, Tsinguidi', deces: '24 août 2020, Perpignan',
      fonctions: 'Président de la République du Congo (1992–1997)',
      mandat: '31 août 1992 – 25 octobre 1997',
      parti: 'Union Panafricaine pour la Démocratie Sociale'
    },
    denis2: {
      nom: 'Denis Sassou Nguesso (2ème mandat)',
      img: 'https://res.cloudinary.com/dcno88ooa/image/upload/q_auto/f_auto/v1776353114/264d8761-363c-4d23-b602-208dba71681e_byjdjw.png',
      bio: "Après la guerre civile, Denis Sassou Nguesso reprend le pouvoir en 1997 et dirige le Congo jusqu'à ce jour. Il est réélu en 2002, 2009 et 2016.",
      naissance: '23 novembre 1943, Edou', deces: 'Vivant',
      fonctions: "Président de la République du Congo (1997–présent)",
      mandat: '25 octobre 1997 – présent',
      parti: 'Parti Congolais du Travail'
    }
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || '';
      this.president = this.data[id] || null;
    });
  }
}
