import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { MarkdownService } from 'angular2-markdown';

@Pipe({
  name: 'sanitizeMarkdown'
})
export class SanitizeMarkdownPipe implements PipeTransform {
  constructor(
    private _sanitizer: DomSanitizer,
    private _markdown: MarkdownService
  ) { }
  transform(value: string, args?: any): SafeHtml {
    if (value) {
      return this._sanitizer.sanitize(SecurityContext.HTML, this._markdown.compile(value));
    }
    return '';
  }

}
