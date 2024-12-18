" Plugins
call plug#begin()
    " Fancy status line
    Plug 'itchyny/lightline.vim'
    " Colorschemes
    Plug 'crusoexia/vim-monokai'
    Plug 'tomasr/molokai'
    Plug 'dracula/vim'
    Plug 'morhetz/gruvbox'
    Plug 'joshdick/onedark.vim'
    " Remember calling :PlugInstall after adding new plugins!
call plug#end()

" Set dark mode
set background=dark

" Colorscheme options:
" - monokai
" - molokai
" - dracula
" - gruvbox (also supports light mode)
" - onedark
colorscheme dracula

" Enable linenumbers
set number

" Enable RGB terminal colors
set termguicolors

" Display statusline
set laststatus=2

" Keymappings
    " Map leader to space
    let mapleader = " "
    " Jump to end of line with ö and start of line with Ö. More ergonomic on
    " german QWERTZ-kezboard.
    map ö $
    map Ö ^
    " s deletes without writing to clipboard
    map s "_d
    " Comment line
    map <leader>7 mz^i// <Esc>`zlll
    " Uncomment line
    map <leader>u mz^s3l`zhhh
    " Reload .vimrc
    map <leader>r <cmd>so $MYVIMRC<CR>
    " Quit (all buffers)
    map <leader>q <cmd>qa<CR>
    " Force quit (all buffers)
    map <leader>fq <cmd>qa!<CR>
    " Save
    map <leader>w <cmd>w<CR>
    " Save and quit (all buffers)
    map <leader>x <cmd>xa<CR>

" Change cursor style between different modes
" Credz: https://stackoverflow.com/a/42118416/9395922
"Cursor settings:
"  1 -> blinking block
"  2 -> solid block 
"  3 -> blinking underscore
"  4 -> solid underscore
"  5 -> blinking vertical bar
"  6 -> solid vertical bar
let &t_EI.="\e[2 q" "Default
let &t_SI.="\e[5 q" "INSERT mode
let &t_SR.="\e[4 q" "REPLACE mode

" Return to last position when opening file
" Credz: https://github.com/amix/vimrc/blob/master/vimrcs/basic.vim
au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif
