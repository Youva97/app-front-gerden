import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom/extend-expect';


declare const jest:any;

// Optionnel : Mock des fonctionnalités spécifiques au navigateur, si nécessaire
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: jest.fn(),
  }),
});

// Optionnel : Suppression des avertissements concernant les styles et le CSS
// jest.mock('src/styles.css', () => ({}));

// Optionnel : Mock des APIs Capacitor (si utilisées)
jest.mock('@capacitor/core', () => {
  return {
    Plugins: {
      Modals: {
        alert: jest.fn(),
      },
      Toast: {
        show: jest.fn(),
      },
      // Ajouter d'autres mocks selon tes besoins
    },
  };
});
