# 🧊 @cwhw/cds

**차가운 디자인 시스템** _(CDS, Cold Design System)_ 은 React 컴포넌트 라이브러리입니다.

일관적인 UI 디자인과 접근성을 고려한 사용자 인터랙션을 제공합니다.

[Storybook 문서](https://640054c53834f08f15bbad68-sscshdmgyf.chromatic.com/) 에서 제공하는 컴포넌트의 종류와 용례를 확인할 수 있습니다.

<!-- ## Table of contents
- [Usage](#usage)
- [Documentation](#documentation)
- [Contributors](#contributors) -->

## Installation

```zsh
npm install @chwh/cds
```

```zsh
yarn add @chwh/cds
```

## Usage

⚠️ 사용을 위해 상위 컴포넌트를 `CdsProvider`로 감싸야 합니다.

```tsx
const App = () => {
  return (
    <CdsProvider>
      // ... your components
    </CdsProvider>
  );
};
```

💅 아래 인터페이스 중 일부를 재정의한 객체를 `CdsProvider`의 `themeColor` props로 전달해 테마 컬러를 변경할 수 있습니다.

```tsx
type ColorSet = {
  primary: Property.Color;
  primaryLight: Property.Color;
  primaryDark: Property.Color;

  alert: Property.Color;
  info: Property.Color;
  success: Property.Color;
  warning: Property.Color;
  error: Property.Color;

  black: Property.Color;
  white: Property.Color;
  offWhite: Property.Color;
  background: Property.Color;
  gray100: Property.Color;
  gray200: Property.Color;
  gray300: Property.Color;
  gray400: Property.Color;
};
```

## Contributors

|             [@prayinforrain](https://github.com/prayinforrain)              |                 [@iyu88](https://github.com/iyu88)                  |                 [@se030](https://github.com/se030)                  |             [@leesunmin1231](https://github.com/leesunmin1231)              |                [@dohun31](https://github.com/dohun31)                 |
| :-------------------------------------------------------------------------: | :-----------------------------------------------------------------: | :-----------------------------------------------------------------: | :-------------------------------------------------------------------------: | :-------------------------------------------------------------------: |
| <img src="https://github.com/prayinforrain.png" width="100" height="100" /> | <img src="https://github.com/iyu88.png" width="100" height="100" /> | <img src="https://github.com/se030.png" width="100" height="100" /> | <img src="https://github.com/leesunmin1231.png" width="100" height="100" /> | <img src="https://github.com/dohun31.png" width="100" height="100" /> |
