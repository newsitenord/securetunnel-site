import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateArticle,duplicateProblems,bodyText,countWords} from '../src/lib/content-policy.js';
const sample=JSON.parse(fs.readFileSync('content/articles/vpn-vs-proxy.json','utf8'));
test('source-checked article meets body-only word floor',()=>{
 assert.deepEqual(validateArticle(sample,'2026-09-28'),[]);assert(countWords(bodyText(sample))>=1200);
});
test('thin article cannot publish',()=>{
 const a=structuredClone(sample);a.sections=[];assert(validateArticle(a).some(e=>e.includes('1200')));
});
test('draft does not require publishable content',()=>assert.deepEqual(validateArticle({slug:'new-draft',status:'draft'}),[]));
test('invalid source citations and URLs cannot publish',()=>{
 const a=structuredClone(sample);a.sections[0].sourceIds=[99];a.sources[0].url='javascript:alert(1)';
 assert(validateArticle(a).some(e=>e.includes('citations')));assert(validateArticle(a).some(e=>e.includes('source URL')));
});
test('future dates and unsupported testing claims are blocked',()=>{
 const a=structuredClone(sample);a.updatedAt='2099-01-01';a.sections[0].paragraphs.push('We tested every server.');
 assert(validateArticle(a).some(e=>e.includes('future')));assert(validateArticle(a).some(e=>e.includes('Unsupported')));
});
test('copied body and swapped title do not pass duplicate checks',()=>{
 const a=structuredClone(sample);a.slug='different-slug';a.title='Different title';a.intent='Different intent';
 assert(duplicateProblems([sample,a]).some(e=>e.includes('duplicate body')));
 assert(duplicateProblems([sample,a]).some(e=>e.includes('copied long paragraph')));
});
test('invalid date never throws',()=>{
 const a=structuredClone(sample);a.updatedAt='bad';assert.doesNotThrow(()=>validateArticle(a));
});
