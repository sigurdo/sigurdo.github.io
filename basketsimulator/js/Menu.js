/*
 * Klasse som fyller ut og administrerer trykk på menyen
 */

class Menu {
    constructor(options) {
        if (options === undefined) options = {};
        const defaultOptions = {
            menuTag: '#meny',
            openTag: '#apneMeny',
            templatesTag: '#menyMaler',
            gamemodes // Må være et objekt av gamemode-klasser
        }
        for (let index in defaultOptions) {
            if (!options[index]) {
                options[index] = defaultOptions[index];
            }
        }

        this.menuTag = options.menuTag;
        this.$el = $(this.menuTag);
        this.isOpen = false;
        this.openTag = options.openTag;
        this.$open = $(this.openTag);
        this.$open.on('click', () => this.apneLukke());
        this.templatesTag = options.templatesTag;
        this.$templates = $(this.templatesTag);
        this.gamemodes = options.gamemodes;
        this.gamemode = undefined;
        window.onload = () => this.apneLukke();
        window.addEventListener('keydown', e => {
            if (e.code === 'Escape') this.hide();
        });
    }

    show() {
        this.$el.show();
        this.isOpen = true;
        this.$open.html('<i class="fas fa-times"></i>');
    }

    hide() {
        this.$el.hide();
        this.isOpen = false;
        this.$open.html('<i class="fas fa-bars"></i>');
    }

    toggleShow() {
        this.isOpen ? this.hide() : this.show();
    }

    apneLukke() {
        this.toggleShow();
        if (this.isOpen) this.renderMain();
    }

    renderMain() {
        this.$el.html(this.getTemplate('main')());
        this.$('.start').on('click', () => this.renderStart());
    }

    renderGameOver(points) {
        this.$el.html(this.getTemplate('gameOver')({ points }));
        this.$('.replay').on('click', () => {
            this.newGame();
            this.toggleShow();
        });
        this.$('.otherGamemode').on('click', () => this.renderStart());
        this.$('.mainMeny').on('click', () => this.renderMain());
    }

    renderStart() {
        const gamemodes = Object.keys(this.gamemodes).map(key => ({ id: key, name: this.gamemodes[key].menuName || key }));
        this.$el.html(this.getTemplate('start')({ gamemodes }));
        for (let id in this.gamemodes) {
            this.$(`button[data-id=${id}]`).on('click', () => {
                this.newGame(this.gamemodes[id]);
                this.apneLukke();
            });
        }
    }

    newGame(gamemode) {
        if (gamemode) this.gamemode = gamemode;
        game = new this.gamemode({
            onGameOver: points => {
                this.show();
                this.renderGameOver(points);
            },
            onSelfRestart: () => {
                // this.hide();
            }
        });
    }

    $(tag) {
        return $(`${this.menuTag}>${tag}`);
    }

    templates$(tag) {
        return $(`${this.templatesTag}>${tag}`);
    }

    getTemplate(classs) {
        return Handlebars.compile(this.templates$(`.${classs}`).html());
    }
}
