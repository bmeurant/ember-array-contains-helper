# Changelog


## v1.3.2 (May 24th, 2017)

#### Commits

- [66cf3ad5](https://github.com/bmeurant/ember-array-contains-helper/commit/66cf3ad51faefdf09f9450a700c9e6b984204930) **refactor(array-contains)**: use ES6 destructuring and default value *by [Baptiste Meurant](https://github.com/bmeurant)*
- [6a6fa30](https://github.com/bmeurant/ember-array-contains-helper/commit/6a6fa3003fa22d3fe001a53b11d541ef6a76613d) **chore(package)**: chore(package): update version for ember-cli-babel *by [Baptiste Meurant](https://github.com/bmeurant)*

## v1.3.1 (December 1st, 2016)

#### Commits

- [8f7da7fc](https://github.com/bmeurant/ember-array-contains-helper/commit/8f7da7fcfb957f34ad7ca808fbd02e0a621d1077) **fix(includes)**: backward compatibility for Array#includes *by [Baptiste Meurant](https://github.com/bmeurant)*

## v1.3.0 (September 12th, 2016)

#### Commits

- [1fa7f914](https://github.com/bmeurant/ember-array-contains-helper/commit/1fa7f914eb80b0166a731e9c97504b2129fc3bad) **docs(dummy)**: fix typo *by [Baptiste Meurant](https://github.com/bmeurant)*
- [c2716988](https://github.com/bmeurant/ember-array-contains-helper/commit/c2716988333017bc4dea33e5234cf8b2fc029d5e) **refactor(array-contains)**: use includes polyfill for older ember versions *by [Baptiste Meurant](https://github.com/bmeurant)*
- [3b791647](https://github.com/bmeurant/ember-array-contains-helper/commit/3b7916472c0a301643c78eb6417fc2bdf8908cb2) **fix(array-contains)**: add missing cleanup on destroy *by [Baptiste Meurant](https://github.com/bmeurant)*
- [01842004](https://github.com/bmeurant/ember-array-contains-helper/commit/01842004cf4f5f5f4d9e3f3233313d6e28b00615) **refactor(array-contains)**: remove unnecessary recompute override *by [Baptiste Meurant](https://github.com/bmeurant)*

## v1.2.0 (August 3rd, 2016)

### Pull Requests

- [#18](https://github.com/bmeurant/ember-array-contains-helper/pull/18)  Prefer includes to contains  *by [Baptiste Meurant](https://github.com/bmeurant)*

#### Commits

- [27ff101a](https://github.com/bmeurant/ember-array-contains-helper/commit/27ff101aeead2c56d08aba426c6cae24b32c29fe) **docs(yuidocs)**: setup yuidoc & theme, make documentation compliant (#5) *by [Baptiste Meurant](https://github.com/bmeurant)*
- [3be72a20](https://github.com/bmeurant/ember-array-contains-helper/commit/3be72a208d47032c500a4902fcb0818cae07b58a) **feat(includes)**: prefer includes to contains (#18) *by [Baptiste Meurant](https://github.com/bmeurant)*
- [220c0d9e](https://github.com/bmeurant/ember-array-contains-helper/commit/220c0d9eb0886fa3f8074c12b3117011ae92e1e9) **docs(readme)**: update readme *by [Baptiste Meurant](https://github.com/bmeurant)*
- [f4b71e05](https://github.com/bmeurant/ember-array-contains-helper/commit/f4b71e057de302f9979066bcb3bdba41cc18f896) **style(array-contains)**: add some comments *by [Baptiste Meurant](https://github.com/bmeurant)*
- [c4900805](https://github.com/bmeurant/ember-array-contains-helper/commit/c490080573303b77b2ec0ea4535f9111ab503447) **docs(readme)**: update badges *by [Baptiste Meurant](https://github.com/bmeurant)*
- [201f17b4](https://github.com/bmeurant/ember-array-contains-helper/commit/201f17b43224195c25a1e35efff13ab8ab2b0cfa) **refactor(array-contains)**: use unitary imports instead of globals *by [Baptiste Meurant](https://github.com/bmeurant)*

## v1.1.0 (July 3rd, 2016)

- [7e91d68](https://github.com/bmeurant/ember-array-contains-helper/commit/7e91d68dc4615e698f69598ed08a2ad9c8877aeb) Update bower dependencies
- [dc26c18](https://github.com/bmeurant/ember-array-contains-helper/commit/dc26c181b5d97bedcb00279e44e6be86fcb80670) [TOOLING] Switch to ember-cli-mirage 0.2.1
- [924c511](https://github.com/bmeurant/ember-array-contains-helper/commit/924c511eec55d1ca58a34e1f24aff53ad9f65e81) [TOOLING] Switch to ember-cli-code-coverage
- [3a35c0a](https://github.com/bmeurant/ember-array-contains-helper/commit/3a35c0aaaa5e026ddb513c02b78d7a71a8c017f1) Update to ember-cli 2.6.2 & ember 2.6
- [9dc51a3](https://github.com/bmeurant/ember-array-contains-helper/commit/9dc51a345bd24b50fd0876d0e76b4f3c5961bbdb) [DOC] Format to JSDoc

## v1.0.2 (December 16, 2015)

- [#1](https://github.com/bmeurant/ember-array-contains-helper/issues/1) [BUGFIX] Do not throw error anymore when array is null or undefined but return false.
- [DOC] Add changelog

## v1.0.1 (December 14, 2015)

- Improve tests
- Switch from ES6 destructuring assignement to standard ES5 assigment because of coverage fails
- Update Documenttation in README - add tooling badges
- Add coverage with ember-cli-blanket

## v1.0.0 (December 13, 2015)

- Initial addon version
