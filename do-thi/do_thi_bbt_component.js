/**
 * TOÁN TRỰC QUAN - WEB VISUAL COMPONENT
 * Trích xuất từ công cụ Khảo sát & Vẽ đồ thị Thầy Lê Bá Lâm (THPT A Túc)
 * Dùng render trực tiếp Đồ thị JSXGraph & Bảng Biến Thiên SVG/HTML trên Website
 */

window.ToanTrucQuanVisual = {
    renderBBT: function(containerId, config) {
        var container = document.getElementById(containerId);
        if (!container) return;
        
        var h_x = 36, h_yp = 36, h_y = 120;
        var y_st = h_x + h_yp;
        
        var html = `
        <div style="display: flex; border: 1px solid var(--bbt-border, #cbd5e1); background: var(--bbt-bg, #ffffff); color: var(--text, #0f172a); font-size: 0.95rem; position: relative; font-family: 'Times New Roman', serif; border-radius: 6px; overflow: hidden; margin: 10px 0;">
            <div style="width: 55px; border-right: 1px solid var(--bbt-border, #cbd5e1); display: flex; flex-direction: column; text-align: center; font-style: italic; z-index: 2; background: var(--bbt-bg, #ffffff);">
                <div style="height: ${h_x}px; line-height: ${h_x}px; border-bottom: 1px solid var(--bbt-border, #cbd5e1);">x</div>
                <div style="height: ${h_yp}px; line-height: ${h_yp}px; border-bottom: 1px solid var(--bbt-border, #cbd5e1);">y'</div>
                <div style="height: ${h_y}px; display: flex; align-items: center; justify-content: center;">y</div>
            </div>
            <div style="flex: 1; position: relative; overflow: hidden; min-height: ${h_x + h_yp + h_y}px;">
                <div style="position: absolute; top: ${h_x}px; left: 0; right: 0; border-bottom: 1px solid var(--bbt-border, #cbd5e1); z-index: 1;"></div>
                <div style="position: absolute; top: ${h_x + h_yp}px; left: 0; right: 0; border-bottom: 1px solid var(--bbt-border, #cbd5e1); z-index: 1;"></div>
        `;
        
        var svg = `<svg width="100%" height="${h_y}px" style="position: absolute; top: ${y_st}px; left: 0; z-index: 2; pointer-events: none;">
            <defs><marker id="arr-head" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.5" markerHeight="4.5" orient="auto-start-reverse"><path d="M 0 1 L 10 5 L 0 9 z" fill="var(--text, #0f172a)"/></marker></defs>`;
            
        function txt(t, x, y) { html += `<div style="position: absolute; left: ${x}%; top: ${y}px; transform: translate(-50%, -50%); white-space: nowrap; z-index: 3;">${t}</div>`; }
        function arr(x1, y1, x2, y2) { svg += `<line x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%" stroke="var(--text, #0f172a)" stroke-width="1.2" marker-end="url(#arr-head)" />`; }
        function dLine(x, top, h) { html += `<div style="position: absolute; left: ${x}%; top: ${top}px; height: ${h}px; width: 4px; border-left: 1px solid var(--bbt-border, #cbd5e1); border-right: 1px solid var(--bbt-border, #cbd5e1); transform: translateX(-50%); z-index: 1; background: var(--bbt-bg, #ffffff);"></div>`; }

        var ty_top = y_st + h_y * 0.18, ty_bot = y_st + h_y * 0.82; 
        var ay_top = 28, ay_bot = 72;

        if (config.x_cols) {
            config.x_cols.forEach(function(item) { txt(item.text, item.x, h_x / 2); });
        }
        if (config.yp_cols) {
            config.yp_cols.forEach(function(item) {
                if (item.is_double) dLine(item.x, h_x, h_yp + h_y);
                else txt(item.text, item.x, h_x + h_yp / 2);
            });
        }
        if (config.y_nodes) {
            config.y_nodes.forEach(function(item) {
                var yp = (item.pos === 'top') ? ty_top : ty_bot;
                txt(item.text, item.x, yp);
            });
        }
        if (config.arrows) {
            config.arrows.forEach(function(item) {
                var y1 = (item.dir === 'up') ? ay_bot : ay_top;
                var y2 = (item.dir === 'up') ? ay_top : ay_bot;
                arr(item.x1, y1, item.x2, y2);
            });
        }

        svg += `</svg>`;
        html += svg + `</div></div>`;
        container.innerHTML = html;
    }
};
