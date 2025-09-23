// DOM取得は共通化
const worksTypes = document.querySelectorAll('.type_button-item');
const allCircles = document.querySelectorAll('.circle'); // 全てのサークルボタン

// イベントリスナー付加
worksTypes.forEach((workType) => {
    workType.addEventListener('click', tabSwitch);
});
allCircles.forEach((circle) => {
    circle.addEventListener('click', handleSlide);
});


// タブ切り替え時の処理
function tabSwitch(event) {
    const typeTargetData = event.currentTarget.dataset.type;
    const typeItems = document.querySelectorAll('.works-type .type_button-item');
    const worksContainers = document.querySelectorAll('.c_container .card_container');
    const circlesInBar = document.querySelectorAll('.bar .circle'); // 全てのサークルを対象

    // 全てのタブボタンから 'is-active' クラスを削除
    typeItems.forEach((typeItem) => {
        typeItem.classList.remove('is-active');
    });

    // 全てのカードコンテナを非表示にし、スライド位置をリセット
    worksContainers.forEach((worksContainer) => {
        worksContainer.classList.remove('is-show');
        worksContainer.style.transform = 'translateX(0%)'; // スライド位置をリセット
    });

    // クリックされたボタンに 'is-active' クラスを付加
    event.currentTarget.classList.add('is-active');

    // クリックされたボタンのデータ属性と同じ値を持つカードコンテナを表示
    let activeContainer = null;
    worksContainers.forEach((worksContainer) => {
        if (worksContainer.dataset.container === typeTargetData) {
            worksContainer.classList.add('is-show');
            activeContainer = worksContainer;
        }
    });

    // スライドバーの状態を更新
    // アクティブなコンテナが見つかった場合のみ処理
    if (activeContainer) {
        const numberOfCards = activeContainer.querySelectorAll('.works-card').length;

        circlesInBar.forEach((circle, index) => {
            if (index < numberOfCards) {
                circle.classList.remove('is-hidden'); // カード数に応じたサークルを表示
                if (index === 0) {
                    circle.classList.add('is-active'); // 最初のサークルをアクティブに
                } else {
                    circle.classList.remove('is-active');
                }
            } else {
                circle.classList.add('is-hidden'); // カード数以上のサークルは非表示
            }
        });
    } else {
        // アクティブなコンテナがない場合、全てのスライドバーを非表示にする
        circlesInBar.forEach(circle => circle.classList.add('is-hidden'));
    }
}


// カードスライド時の処理 (変更なし)
function handleSlide(eventObject) {
    const clickedCircle = eventObject.currentTarget;
    const barElement = clickedCircle.closest('.bar');
    const circlesInBar = Array.from(barElement.querySelectorAll('.circle:not(.is-hidden)')); 

    const activeContainer = document.querySelector('.card_container.is-show');

    if (!activeContainer) {
        console.error('表示中のカードコンテナが見つかりません。');
        return;
    }

    const numberOfCards = activeContainer.querySelectorAll('.works-card').length;
    const clickedCircleIndex = circlesInBar.indexOf(clickedCircle);

    const slidePercentage = - (100 / numberOfCards) * clickedCircleIndex; 

    activeContainer.style.transform = `translateX(${slidePercentage}%)`;

    circlesInBar.forEach((circle) => {
        circle.classList.remove('is-active');
    });

    clickedCircle.classList.add('is-active');
}

// 初期ロード時のタブとスライドバーの状態を設定
document.addEventListener('DOMContentLoaded', () => {
    // まず全てのタブボタンからアクティブクラスを削除（HTMLで初期設定されている場合を考慮）
    document.querySelectorAll('.type_button-item').forEach(item => item.classList.remove('is-active'));
    
    // 最初のタブ（data-type="01"）を強制的にアクティブにする
    const firstTab = document.querySelector('.type_button-item[data-type="01"]');
    if (firstTab) {
        const syntheticEvent = { currentTarget: firstTab };
        tabSwitch(syntheticEvent);
    } else {
        console.warn('初期表示すべきタブボタンが見つかりませんでした。');
        // もし最初のタブが見つからない場合、全てのカードコンテナを非表示に
        document.querySelectorAll('.c_container .card_container').forEach(container => {
            container.classList.remove('is-show');
            container.style.transform = 'translateX(0%)';
        });
        // 全てのスライドバーも非表示に
        document.querySelectorAll('.bar .circle').forEach(circle => circle.classList.add('is-hidden'));
    }
});