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
  transform(value: string, safe?: boolean, args?: any): SafeHtml {
    if (value) {
      if (!safe) {
        return this._sanitizer.sanitize(SecurityContext.HTML, this._markdown.compile(value));
      } else {
        return this._sanitizer.bypassSecurityTrustHtml(this._markdown.compile(value));
      }
    }
    return '';
  }

}
